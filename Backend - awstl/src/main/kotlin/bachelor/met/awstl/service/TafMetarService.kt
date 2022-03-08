package bachelor.met.awstl.service

import bachelor.met.awstl.dto.TafMetarDto
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class TafMetarService(val httpService: HttpService, val service: FlyplassService) {

    @Value("\${tafmetar}")
    var url = ""

    val logger = LoggerFactory.getLogger(TafMetarService::class.java)


    @Cacheable(value = ["tafmetar"], key = "#icao")
    fun getMetar(icao: String): TafMetarDto {
        logger.info("Getting taf metar for $icao")

        service.getFlyplass(icao)

        val query: HashMap<String, String> = HashMap()
        query["icao"] = icao

        val tafmetar = httpService.hentData(url, String::class.java, query)

        if (tafmetar != null) {

            val list = tafmetar.lines()
            val ret = TafMetarDto()

            ret.taf = list[3]
            ret.metar = list[list.size-4]

            return ret;
        }

        throw Exception("Could not get taf metar for icao $icao")

    }

}
