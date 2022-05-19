package bachelor.met.awstl.service

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.enum.Cache
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class LocationForecastService(val httpService: HttpService, val flyplass: FlyplassService, val cacheService: CacheService) {

    @Value("\${location.forecast}")
    var url:String = ""

    val logger: Logger = LoggerFactory.getLogger(LocationForecastService::class.java)

    fun getForecast(icao: String): LocationForecastDto? {
        logger.info("validating cache for $icao and locfor")
        cacheService.chechCache(icao, Cache.LOCFOR)

        return try {
            getForecastCache(icao)
        } catch (e: Exception) {
            logger.warn("error getting forecast for with cache $icao")
            getLocationForeacastDefault(icao)
        }
    }


    /***
     * gets weather from api.met.no based on altitude, latitude and longitude
     * returns weather parsed to kotlin class elements from json
     */
    @Cacheable(value = ["locfor"], key = "#icao")
    fun getForecastCache(icao: String): LocationForecastDto? {

        val airport = flyplass.getFlyplass(icao)

        val queryParams: HashMap<String, String> = HashMap();
        queryParams["altitude"] = airport.altitude
        queryParams["lat"] = airport.lat
        queryParams["lon"] = airport.lon

        logger.info("Getting location forecast for $icao from api.met.no")

        val unformed = httpService.hentData(url, LocationForecastDto::class.java, queryParams, icao, Cache.LOCFOR)


        unformed.properties!!.timeseries = unformed.properties!!.timeseries!!.filterIndexed {index, _ -> index < 58}.toTypedArray()

        return unformed

    }

    fun getLocationForeacastDefault(icao: String): LocationForecastDto? {
        val airport = flyplass.getFlyplass(icao)

        val queryParams: HashMap<String, String> = HashMap();
        queryParams["altitude"] = airport.altitude
        queryParams["lat"] = airport.lat
        queryParams["lon"] = airport.lon

        logger.info("Getting location forecast for $icao from api.met.no")

        val unformed = httpService.hentData(url, LocationForecastDto::class.java, queryParams, icao, Cache.LOCFOR)


        unformed.properties!!.timeseries = unformed.properties!!.timeseries!!.filterIndexed {index, _ -> index < 58}.toTypedArray()

        return unformed
    }


}
