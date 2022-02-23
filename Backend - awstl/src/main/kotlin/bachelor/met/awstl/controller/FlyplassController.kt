package bachelor.met.awstl.controller

import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.service.FlyplassService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


/**
 * Controller for receiving data about airports
 * Available endpoints
 *  /api/airport
 *  /api/airport/dto
 * dto endpoint converts data to dto to reduce received data
 *
 * logic to get data is done in injected FlyplassService
 */
@RestController
@RequestMapping(value = ["/api"])
@CrossOrigin(value = ["http://localhost:3001"])
class FlyplassController(var service: FlyplassService) {

    @GetMapping(value = ["/airport/dto"])
    fun getAllAirportsDto(): ResponseEntity<Any> {
        return ResponseEntity.ok(service.getAllFlyplass().map { FlyplassToFlyplassDto.convert(it) })
    }

    @GetMapping(value = ["/airport"])
    fun getAllAirports(): ResponseEntity<Any> {
        return ResponseEntity.ok(service.getAllFlyplass())
    }

}
