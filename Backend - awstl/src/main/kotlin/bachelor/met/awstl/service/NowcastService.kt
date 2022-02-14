package bachelor.met.awstl.service

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.dto.nowcast.Nowcast
import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.repo.IFlyplassRepo
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class NowcastService(val restTemplate: RestTemplate, val repo: IFlyplassRepo) {

    @Value("\${nowcast}")
    var url = ""

    val logger = LoggerFactory.getLogger(NowcastService::class.java)


    @Cacheable(value = ["nowcast"], key = "#icao")
    fun getNowcast(icao: String): NowcastDto {
        val dto = NowcastDto();
        val stdFlyplasser = arrayOf("ENGM", "ENBR", "ENVA")
        if (icao in stdFlyplasser) {
            throw Exception("Not implemented yet")
        } else {
            logger.info("henter nowcast for $icao med standard")
            val airports = arrayOf(
                repo.findById(icao),
                repo.findById("engm"),
                repo.findById("enbr"),
                repo.findById("enva"))

            for (airport in airports) {
                val query = HashMap<String, String>()
                query["altitude"] = airport.get().altitude
                query["lat"] = airport.get().lat
                query["lon"] = airport.get().lon

                try {
                    restTemplate.getForObject(url, Nowcast::class.java, query)?.let {
                        it.properties.timeseries = it.properties.timeseries.copyOfRange(0, 1) ;
                        dto.nowcasts.add(it) }
                    dto.airports.add(FlyplassToFlyplassDto.convert(airport.get()))
                } catch (e: Exception) {
                    logger.error(e.message)
                    e.printStackTrace()
                    throw Exception("something went wrong")
                }
            }

            return dto
        }

    }


}
