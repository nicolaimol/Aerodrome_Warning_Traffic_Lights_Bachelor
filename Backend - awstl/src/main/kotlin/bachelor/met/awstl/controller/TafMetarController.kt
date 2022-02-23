package bachelor.met.awstl.controller

import bachelor.met.awstl.service.TafMetarService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for receiving taf and metar
 * enpoints
 *  /api/tafmetar?icao=
 *  icao is required for receiving data
 *
 * logic to get data is done in injected TafMetrarSerice
 */
@RestController
@RequestMapping("/api")
class TafMetarController(val service: TafMetarService) {

    @GetMapping("/tafmetar")
    fun getTafMetar(@RequestParam("icao") icao: String): ResponseEntity<Any> {

        try {
            val tafmetar = service.getMetar(icao)

            return ResponseEntity.ok(tafmetar)
        } catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }

    }

}
