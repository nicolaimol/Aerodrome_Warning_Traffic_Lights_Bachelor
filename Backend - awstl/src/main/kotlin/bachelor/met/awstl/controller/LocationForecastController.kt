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

        var res = service.getForecast()

        res?.properties?.timeseries =
            res?.properties?.timeseries?.filterIndexed { index, _ -> index < 5 }!!.toTypedArray()

        return ResponseEntity.ok(res)

    }
}
