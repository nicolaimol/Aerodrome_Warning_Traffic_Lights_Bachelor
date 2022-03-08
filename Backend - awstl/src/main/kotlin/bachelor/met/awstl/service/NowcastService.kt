package bachelor.met.awstl.service

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.dto.nowcast.Nowcast
import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Flyplass
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import kotlin.collections.HashMap

@Service
class NowcastService(
    val httpService: HttpService,
    val sercice: FlyplassService) {

    @Value("\${nowcast}")
    var url = ""

    val logger: Logger = LoggerFactory.getLogger(NowcastService::class.java)


    fun getNowcast(icao: String): NowcastDto {
        val dto = NowcastDto();
        val stdFlyplasser = arrayListOf("ENGM", "ENBR", "ENVA")

        if (icao.uppercase() in stdFlyplasser) {

            stdFlyplasser.removeAt(stdFlyplasser.indexOf(icao.uppercase()))

            stdFlyplasser.add(0, icao)
            stdFlyplasser.add("ENZV")


            logger.info("henter nowcast for $icao standard")
            val airports = arrayOf(
                sercice.getFlyplass(icao.uppercase()),
                sercice.getFlyplass(stdFlyplasser[1]),
                sercice.getFlyplass(stdFlyplasser[2]),
                sercice.getFlyplass(stdFlyplasser[3]))

            getWeather(airports, dto)

            return dto



        } else {
            logger.info("henter nowcast for $icao med standard")
            val airports = arrayOf(
                sercice.getFlyplass(icao.uppercase()),
                sercice.getFlyplass("ENGM"),
                sercice.getFlyplass("ENBR"),
                sercice.getFlyplass("ENVA"))

            getWeather(airports, dto)

            return dto
        }

    }

    private fun getWeather(
        airports: Array<Flyplass>,
        dto: NowcastDto
    ) {
        for (airport in airports) {
            val query = HashMap<String, String>()
            query["altitude"] = airport.altitude
            query["lat"] = airport.lat
            query["lon"] = airport.lon


            getForAirport(airport.icao, query)?.let {
                it.properties.timeseries = it.properties.timeseries.copyOfRange(0, 1);
                dto.nowcasts.add(it)
            }
            dto.airports.add(FlyplassToFlyplassDto.convert(airport))

        }
    }

    @Cacheable(value = ["nowcast"], key = "#icao")
    fun getForAirport(icao: String, query: HashMap<String, String>): Nowcast? {
        logger.info("Nowcast for $icao")

        return httpService.hentData(url, Nowcast::class.java, query)

    }
}
