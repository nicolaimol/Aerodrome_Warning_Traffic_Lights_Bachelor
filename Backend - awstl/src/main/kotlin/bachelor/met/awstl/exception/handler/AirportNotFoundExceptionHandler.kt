package bachelor.met.awstl.exception.handler

import bachelor.met.awstl.exception.AirportNotFoundException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
class AirportNotFoundExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(AirportNotFoundExceptionHandler::class.java)

    @ExceptionHandler(value = [AirportNotFoundException::class])
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    fun airportNotFoundExceptionHandler (e: AirportNotFoundException): ResponseEntity<String> {
        logger.error(e.message)

        return ResponseEntity.badRequest().body(e.message)
    }

}
