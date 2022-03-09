package bachelor.met.awstl.exception.handler

import bachelor.met.awstl.exception.response.InternalExceptionResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.time.LocalDateTime

@ControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
class InternalExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(InternalExceptionHandler::class.java)

    @ExceptionHandler(value = [Exception::class])
    fun handleInternalException(e: Exception): ResponseEntity<Any> {

        logger.error("Handled error: ${e.message}")

        val response = InternalExceptionResponse(
            LocalDateTime.now(),
            message = e.message!!,
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        )

        return ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR)

    }
}
