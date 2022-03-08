package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.TerskelverdiDto
import bachelor.met.awstl.service.TerskelverdiService
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.Duration

@RestController
@RequestMapping(value = ["/api/terskel"])
//@CrossOrigin(value = ["http://localhost:3001"])
class TerskelverdiController(val service: TerskelverdiService) {

    val logger = LoggerFactory.getLogger(TerskelverdiController::class.java)

    @GetMapping
    fun getTerskel(@CookieValue("terskel", defaultValue = "") terskel: String):ResponseEntity<Any> {


        when(terskel) {
            "" -> {
                val ret = service.getTerskelverdi(terskel)
                return ResponseEntity.ok(ret)
            }
            else -> {
                return ResponseEntity.notFound().build()
            }
        }


        /*
        if (terskel != "") {
            return try {
                val ret = service.getTerskelverdi(terskel)
                ResponseEntity.ok(ret)
            } catch (e: Exception) {
                val cookie: ResponseCookie = ResponseCookie.from("terskel", "").maxAge(Duration.ofSeconds(1)).build()
                ResponseEntity.badRequest()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(e.message)
            }

        } else {
            return ResponseEntity.notFound().build()
        }
         */


    }

    @PostMapping()
    fun setTerskel(@CookieValue("terskel", defaultValue = "") terskel: String,
                   @RequestBody dto: TerskelverdiDto): ResponseEntity<Any> {

        if (terskel != "") {
            //return try {
                service.updateTerskelverdi(terskel, dto)
                return ResponseEntity.ok().build()
            /*} catch (e: Exception) {
                val cookie: ResponseCookie = ResponseCookie.from("terskel", "").maxAge(Duration.ofSeconds(1)).build()
                ResponseEntity.badRequest()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .build()
            }

             */
        }

        else {
            val base = service.addTerskelverdi(dto)
            val cookie: ResponseCookie = ResponseCookie.from("terskel", base).maxAge(Duration.ofDays(365*10)).build()
            return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build()
        }
    }

    @GetMapping(value = ["/all"])
    fun getAll(): ResponseEntity<Any> {
        return ResponseEntity.ok(service.getAll())
    }
}
