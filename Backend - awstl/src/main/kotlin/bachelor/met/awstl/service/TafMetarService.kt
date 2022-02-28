package bachelor.met.awstl.service

import bachelor.met.awstl.dto.TafMetarDto
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

@Service
class TafMetarService(val template: RestTemplate) {

    @Value("\${tafmetar}")
    var url = ""

    val logger = LoggerFactory.getLogger(TafMetarService::class.java)


    @Cacheable(value = ["tafmetar"], key = "#icao")
    fun getMetar(icao: String): TafMetarDto {
        logger.info("Getting taf metar for $icao")


        var query: HashMap<String, String> = HashMap()
        query["icao"] = icao

        var tafmetar = template.getForObject(url, String::class.java, query)

        if (tafmetar != null) {

            val list = tafmetar.lines()
            val ret = TafMetarDto()

            ret.taf = list[3]
            ret.metar = list[list.size-4]

            return ret;
        }

        throw Exception("Error in geting taf metar")

    }

}
