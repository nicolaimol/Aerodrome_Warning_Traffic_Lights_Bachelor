package bachelor.met.awstl.exception

import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders.SET_COOKIE
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.time.Duration

@ControllerAdvice
class TerskelverdiNotFoundExceptionHandler {

    val logger = LoggerFactory.getLogger(TerskelverdiNotFoundExceptionHandler::class.java)

    @ExceptionHandler(value = [TerskelverdiNotFoundException::class])
    fun terskelverdiNotFoundExceptionHandler(e: TerskelverdiNotFoundException): ResponseEntity<Any> {

        logger.error(e.message)

        val cookie: ResponseCookie = ResponseCookie
            .from("terskel", "")
            .maxAge(Duration.ofSeconds(1))
            .build()

        return ResponseEntity
            .badRequest()
            .header(SET_COOKIE, cookie.toString())
            .body(e.message)
    }

}
