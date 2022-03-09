package bachelor.met.awstl.exception.response

import org.springframework.http.HttpStatus
import java.time.LocalDateTime

class InternalExceptionResponse(
    val timestamp: LocalDateTime,
    val message: String,
    val httpStatus: HttpStatus
) {
}
