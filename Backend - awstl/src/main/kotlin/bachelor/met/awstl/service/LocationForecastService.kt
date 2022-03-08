package bachelor.met.awstl.service

import bachelor.met.awstl.dto.LocationForecastDto
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class LocationForecastService(val httpService: HttpService, val flyplass: FlyplassService) {

    @Value("\${location.forecast}")
    var url:String = ""

    val logger: Logger = LoggerFactory.getLogger(LocationForecastService::class.java)


    /***
     * gets weather from api.met.no based on altitude, latitude and longitude
     * returns weather parsed to kotlin class elements from json
     */
    @Cacheable(value = ["locfor"], key = "#icao")
    fun getForecast(icao: String): LocationForecastDto? {

        val airport = flyplass.getFlyplass(icao)!!

        var queryParams: HashMap<String, String> = HashMap();
        queryParams["altitude"] = airport.altitude
        queryParams["lat"] = airport.lat
        queryParams["lon"] = airport.lon

        logger.info("Getting data from $url")

        return httpService.hentData(url, LocationForecastDto::class.java, queryParams)

    }


}
