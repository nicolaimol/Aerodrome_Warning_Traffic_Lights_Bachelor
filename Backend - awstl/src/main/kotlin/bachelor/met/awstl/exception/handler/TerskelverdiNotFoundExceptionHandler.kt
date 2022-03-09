package bachelor.met.awstl.exception.handler

import bachelor.met.awstl.exception.TerskelverdiNotFoundException
import org.slf4j.LoggerFactory
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpHeaders.SET_COOKIE
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.time.Duration

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
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
