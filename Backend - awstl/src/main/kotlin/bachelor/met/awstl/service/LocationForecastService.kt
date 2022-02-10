package bachelor.met.awstl.service

import bachelor.met.awstl.dto.LocationForecastDto
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.redis.core.RedisHash
import org.springframework.data.redis.core.TimeToLive
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForEntity
import org.springframework.web.client.getForObject
import java.util.concurrent.TimeUnit

@Service
class LocationForecastService(val template: RestTemplate) {

    @Value("\${location.forecast}")
    var url:String = ""

    val logger = LoggerFactory.getLogger(LocationForecastService::class.java)


    /***
     * gets weather from api.met.no based on altitude, latitude and longitude
     * returns weather parsed to kotlin class elements from json
     */
    @Cacheable(value = ["locfor"], key = "#lat")
    fun getForecast(altitude: String, lat: String, lon: String): LocationForecastDto? {

        var queryParams: HashMap<String,Any> = HashMap();
        queryParams["altitude"] = altitude
        queryParams["lat"]=lat
        queryParams["lon"]=lon

        logger.info("Getting data from $url")

        return template.getForObject(url, LocationForecastDto::class.java, queryParams)

    }


}
