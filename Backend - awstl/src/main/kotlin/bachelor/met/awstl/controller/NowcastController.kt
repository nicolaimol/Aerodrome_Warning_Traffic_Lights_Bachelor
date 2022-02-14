package bachelor.met.awstl.controller

import bachelor.met.awstl.service.NowcastService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/api"])
class NowcastController(val service: NowcastService) {

    val logger = LoggerFactory.getLogger(NowcastController::class.java)

    @GetMapping(value = ["/nowcast"])
    fun getNowCast(@RequestParam("icao") icao: String): ResponseEntity<Any> {
        try {
            val ret = service.getNowcast(icao)

            return ResponseEntity.ok(ret)
        } catch (e: Exception) {
            logger.error(e.message)
            e.printStackTrace()
            return ResponseEntity.badRequest().build()
        }
    }



}
