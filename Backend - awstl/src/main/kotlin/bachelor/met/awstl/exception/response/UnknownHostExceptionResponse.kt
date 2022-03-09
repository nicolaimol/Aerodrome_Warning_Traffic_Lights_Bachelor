package bachelor.met.awstl.exception.response

import org.springframework.http.HttpStatus
import java.time.LocalDateTime

class UnknownHostExceptionResponse(
    val message: String,
    val timestamp: LocalDateTime,
    val httpStatus: HttpStatus,
    val status: Int
    ) {
}
