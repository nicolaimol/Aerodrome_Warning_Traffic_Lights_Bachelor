package bachelor.met.awstl.service

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.dto.nowcast.Nowcast
import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.repo.IFlyplassRepo
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject
import java.util.*
import kotlin.collections.ArrayList
import kotlin.collections.HashMap

@Service
class NowcastService(val restTemplate: RestTemplate, val repo: IFlyplassRepo) {

    @Value("\${nowcast}")
    var url = ""

    val logger = LoggerFactory.getLogger(NowcastService::class.java)


    fun getNowcast(icao: String): NowcastDto {
        val dto = NowcastDto();
        val stdFlyplasser = arrayListOf("ENGM", "ENBR", "ENVA")
        if (icao.uppercase() in stdFlyplasser) {

            stdFlyplasser.removeAt(stdFlyplasser.indexOf(icao))

            stdFlyplasser.add(0, icao)
            stdFlyplasser.add("ENZV")


            logger.info("henter nowcast for $icao standard")
            val airports = arrayOf(
                repo.findById(icao.uppercase()),
                repo.findById(stdFlyplasser[1]),
                repo.findById(stdFlyplasser[2]),
                repo.findById(stdFlyplasser[3]))

            getWeather(airports, dto)

            return dto



        } else {
            logger.info("henter nowcast for $icao med standard")
            val airports = arrayOf(
                repo.findById(icao.uppercase()),
                repo.findById("ENGM"),
                repo.findById("ENBR"),
                repo.findById("ENVA"))

            getWeather(airports, dto)

            return dto
        }

    }

    private fun getWeather(
        airports: Array<Optional<Flyplass>>,
        dto: NowcastDto
    ) {
        for (airport in airports) {
            val query = HashMap<String, String>()
            query["altitude"] = airport.get().altitude
            query["lat"] = airport.get().lat
            query["lon"] = airport.get().lon

            try {
                getForAirport(airport.get().icao, query)?.let {
                    it.properties.timeseries = it.properties.timeseries.copyOfRange(0, 1);
                    dto.nowcasts.add(it)
                }
                dto.airports.add(FlyplassToFlyplassDto.convert(airport.get()))
            } catch (e: Exception) {
                logger.error(e.message)
                e.printStackTrace()
                throw Exception("something went wrong")
            }
        }
    }

    @Cacheable(value = ["nowcast"], key = "#icao")
    fun getForAirport(icao: String, query: HashMap<String, String>): Nowcast? {
        logger.info("Nowcast for $icao")
        return restTemplate.getForObject(url, Nowcast::class.java, query)
    }


}
