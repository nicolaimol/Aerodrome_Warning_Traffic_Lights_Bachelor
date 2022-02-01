package bachelor.met.awstl.service

import bachelor.met.awstl.dto.LocationForecastDto
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForEntity
import org.springframework.web.client.getForObject

@Service
class LocationForecastService(val template: RestTemplate) {

    @Value("\${lf}")
    var url:String = ""

    val logger = LoggerFactory.getLogger(LocationForecastService::class.java)

    fun getForecast(): LocationForecastDto? {

        var queryParams: HashMap<String,Any> = HashMap();
        queryParams["altitude"] = "100"
        queryParams["lat"]="60"
        queryParams["lon"]="10"

        logger.info("Getting data from $url")

        return template.getForObject(url, LocationForecastDto::class.java, queryParams)

        //return null
    }


}
