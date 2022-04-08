package bachelor.met.awstl.exception.response

import org.springframework.http.HttpStatus
import java.time.LocalDateTime

class AccessDeniedExceptionResponse(
    val status: HttpStatus,
    val timestamp: LocalDateTime,
    val message: String,
    val error: String
) {


}
