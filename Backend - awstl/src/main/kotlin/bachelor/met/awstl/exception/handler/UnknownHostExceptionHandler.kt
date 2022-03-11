package bachelor.met.awstl.exception.handler

import bachelor.met.awstl.exception.UnknownHostException
import bachelor.met.awstl.exception.response.UnknownHostExceptionResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import java.time.LocalDateTime

@ControllerAdvice
class UnknownHostExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(UnknownHostExceptionHandler::class.java)

    @ResponseStatus(value = HttpStatus.SERVICE_UNAVAILABLE)
    @ExceptionHandler(value = [UnknownHostException::class])
    fun handleUnknownhostException(e: UnknownHostException): ResponseEntity<UnknownHostExceptionResponse> {

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

