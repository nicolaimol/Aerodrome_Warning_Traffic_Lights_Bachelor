package bachelor.met.awstl.exception.handler

import bachelor.met.awstl.exception.response.InternalExceptionResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import java.time.LocalDateTime

@ControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
class InternalExceptionHandler {

    val logger: Logger = LoggerFactory.getLogger(InternalExceptionHandler::class.java)

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = [MissingServletRequestParameterException::class])
    fun missingParamException(e: MissingServletRequestParameterException): ResponseEntity<InternalExceptionResponse> {

        val response = InternalExceptionResponse(
            LocalDateTime.now(),
            e.message,
            HttpStatus.BAD_REQUEST
        )

        return ResponseEntity(response, HttpStatus.BAD_REQUEST)
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = [Exception::class])
    fun handleInternalException(e: Exception): ResponseEntity<InternalExceptionResponse> {

        logger.error("Handled error: ${e.message}")

        val response = InternalExceptionResponse(
            LocalDateTime.now(),
            message = e.message!!,
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        )

        return ResponseEntity.internalServerError().header("content-type", "application/json").body(response)

    }
}
