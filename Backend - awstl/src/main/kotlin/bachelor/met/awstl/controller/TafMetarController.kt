package bachelor.met.awstl.controller

import bachelor.met.awstl.service.TafMetarService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/tafmetar")
class TafMetarController(val service: TafMetarService) {

    @GetMapping("/{icao}")
    fun getTafMetar(@PathVariable("icao") icao: String): ResponseEntity<Any> {

        try {
            val tafmetar = service.getMetar(icao)

            return ResponseEntity.ok(tafmetar)
        } catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }

    }

}
