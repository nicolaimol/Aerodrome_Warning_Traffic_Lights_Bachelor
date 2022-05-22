package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.FlyplassDto
import bachelor.met.awstl.dto.FlyplassSlettDto
import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.service.FlyplassService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.annotation.security.RolesAllowed


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
    fun getAllAirportsDto(): ResponseEntity<List<FlyplassDto>> {
        return ResponseEntity.ok(service.getAllFlyplass().map { FlyplassToFlyplassDto.convert(it) })
    }

    @GetMapping(value = ["/airport"])
    fun getAllAirports(): ResponseEntity<List<Flyplass>> {
        return ResponseEntity.ok(service.getAllFlyplass())
    }

    @PutMapping(value = ["/airport"])
    @RolesAllowed(value = ["admin", "user"])
    fun updateAirport(@RequestBody flyplass: Flyplass): ResponseEntity<Any> {

        service.updateFlyplass(flyplass.icao!!, flyplass)

        return ResponseEntity.ok().build()
    }

    @PostMapping(value = ["/airport"])
    @RolesAllowed(value = ["admin", "user"])
    fun addAirport(@RequestBody flyplass: Flyplass): ResponseEntity<Any> {
        service.addFlyplass(flyplass)

        return ResponseEntity.ok().build()
    }

    @DeleteMapping(value = ["/airport"])
    @RolesAllowed(value = ["admin", "user"])
    fun deleteAirport(@RequestBody dto: FlyplassSlettDto): ResponseEntity<Any> {

        service.deleteFlyplass(dto.icao)

        return ResponseEntity.ok().build()

    }

}
