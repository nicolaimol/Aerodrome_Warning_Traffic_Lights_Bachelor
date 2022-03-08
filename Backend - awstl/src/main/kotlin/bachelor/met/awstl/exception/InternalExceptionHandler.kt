package bachelor.met.awstl.exception

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class InternalExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(InternalExceptionHandler::class.java)

    @ExceptionHandler(value = [IllegalArgumentException::class])
    fun handleUnknownhostException(e: IllegalArgumentException): ResponseEntity<Any> {

        return ResponseEntity.internalServerError().body(e.message)

    }
}
