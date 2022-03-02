package bachelor.met.awstl.controller

import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.service.LocationForecastService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for receiving data about locationforecast
 * Available enpoints
 *  /api/locationforecast?icao=
 *  icao string is required for endpoint
 *
 * logic to get data is done in injected LocationForecastService
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(value = ["http://localhost:3001"])
class LocationForecastController(val service: LocationForecastService) {

    val logger = LoggerFactory.getLogger(LocationForecastController::class.java)

    @GetMapping("/test")
    fun getLocationForecast(): ResponseEntity<Any> {

        val res = service.getForecast("engm")

        res!!.properties!!.timeseries =
            res.properties!!.timeseries!!.filterIndexed { index, _ -> index < 10 }.toTypedArray()

        return ResponseEntity.ok(res)

    }

    @GetMapping(value = ["/locationforecast"])
    fun getLocationForecastIcao(@RequestParam(name = "icao")icao: String): ResponseEntity<Any> {
        try {
            val res = service.getForecast(icao)

            res!!.properties!!.timeseries = res.properties!!.timeseries!!.filterIndexed {index, _ -> index < 58}.toTypedArray()

            return ResponseEntity.ok(res)
        } catch (e: AirportNotFoundException) {
            logger.error(e.message)
            return ResponseEntity.badRequest().body(e.message)
        } catch (e: Exception) {
            logger.error(e.message)
            e.printStackTrace()
            return ResponseEntity.internalServerError().body(e.message)
        }
    }
}
