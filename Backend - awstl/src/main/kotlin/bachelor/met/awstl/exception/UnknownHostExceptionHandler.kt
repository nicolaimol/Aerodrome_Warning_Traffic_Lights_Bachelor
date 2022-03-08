package bachelor.met.awstl.exception

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.time.LocalDateTime

@ControllerAdvice
class UnknownHostExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(UnknownHostExceptionHandler::class.java)

    @ExceptionHandler(value = [UnknownHostException::class])
    fun handleUnknownhostException(e: UnknownHostException): ResponseEntity<Any> {

        logger.error("${e.message} er ikke tilgjengelig")

        val response = UnknownHostExceptionResponse(
            e.message!!,
            LocalDateTime.now(),
            HttpStatus.SERVICE_UNAVAILABLE,
            503
        )

        return ResponseEntity(response, HttpStatus.SERVICE_UNAVAILABLE)

    }

}

