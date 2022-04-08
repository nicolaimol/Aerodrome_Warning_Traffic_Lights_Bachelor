package bachelor.met.awstl.exception.handler

import bachelor.met.awstl.exception.response.AccessDeniedExceptionResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import java.time.LocalDateTime
import javax.ws.rs.NotAuthorizedException

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
class AccessDeniedExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(AccessDeniedExceptionHandler::class.java)

    @ExceptionHandler(value = [org.springframework.security.access.AccessDeniedException::class])
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    fun accessDeniedExceptionHandler (e: org.springframework.security.access.AccessDeniedException): ResponseEntity<AccessDeniedExceptionResponse> {
        logger.error(e.message)

        val error = AccessDeniedExceptionResponse(
            status = HttpStatus.UNAUTHORIZED,
            timestamp = LocalDateTime.now(),
            message = e.message!!,
            error = e.message!!
        )

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error)
    }

    @ExceptionHandler(value = [javax.ws.rs.NotAuthorizedException::class])
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    fun loginFailed(e: NotAuthorizedException): ResponseEntity<AccessDeniedExceptionResponse> {
        logger.error(e.message)

        val error = AccessDeniedExceptionResponse(
            status = HttpStatus.UNAUTHORIZED,
            timestamp = LocalDateTime.now(),
            message = e.message!!,
            error = e.message!!
        )

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error)
    }
}
