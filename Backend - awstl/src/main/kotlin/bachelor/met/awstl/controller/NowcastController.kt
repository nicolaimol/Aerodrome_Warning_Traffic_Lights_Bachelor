package bachelor.met.awstl.controller

import bachelor.met.awstl.service.NowcastService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


/**
 * Controller for receiving nowcast
 * enppoints
 *  /api/nowcast?icao
 *  icao is required for receiving data
 *
 * logic to get data is done in injected NowcastService
 */
@RestController
@RequestMapping(value = ["/api"])
@CrossOrigin(value = ["http://localhost:3001"])
class NowcastController(val service: NowcastService) {

    val logger = LoggerFactory.getLogger(NowcastController::class.java)

    @GetMapping(value = ["/nowcast"])
    fun getNowCast(@RequestParam("icao") icao: String): ResponseEntity<Any> {
        try {
            val ret = service.getNowcast(icao)

            return ResponseEntity.ok(ret)
        } catch (e: Exception) {
            logger.error(e.message)
            return ResponseEntity.badRequest().body(e.message)
        }
    }



}
