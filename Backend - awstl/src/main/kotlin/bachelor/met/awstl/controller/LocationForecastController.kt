package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.service.LocationForecastService
import bachelor.met.awstl.util.ExpireHeader
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
class LocationForecastController(val service: LocationForecastService, val expireHeader: ExpireHeader) {

    val logger = LoggerFactory.getLogger(LocationForecastController::class.java)

    @GetMapping(value = ["/locationforecast"])
    fun getLocationForecastIcao(@RequestParam(name = "icao")icao: String): ResponseEntity<LocationForecastDto> {
        val res = service.getForecast(icao)

        val headers = expireHeader.makeHeader(icao, Cache.LOCFOR)

        return ResponseEntity.ok().headers(headers).body(res)

    }
}
