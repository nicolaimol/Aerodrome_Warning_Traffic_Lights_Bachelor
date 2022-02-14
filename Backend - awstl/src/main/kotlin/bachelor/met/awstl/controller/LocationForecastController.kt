package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.locationforecast.Timeseries
import bachelor.met.awstl.service.LocationForecastService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class LocationForecastController(val service: LocationForecastService) {



    @GetMapping("/test")
    fun getLocationForecast(): ResponseEntity<Any> {

        val res = service.getForecast("engm")

        res?.properties?.timeseries =
            res?.properties?.timeseries?.filterIndexed { index, _ -> index < 10 }!!.toTypedArray()

        return ResponseEntity.ok(res)

    }
}
