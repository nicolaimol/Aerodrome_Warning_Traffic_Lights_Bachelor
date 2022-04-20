package bachelor.met.awstl.util

import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.service.CacheService
import org.springframework.stereotype.Component
import org.springframework.http.HttpHeaders
import java.text.SimpleDateFormat
import java.util.*

@Component
class ExpireHeader(private val cacheService: CacheService) {
    fun makeHeader(icao: String, type: Cache): HttpHeaders {
        val formatter = SimpleDateFormat("E, dd MMM yyyy HH:mm:ss z", Locale.ENGLISH)
        formatter.timeZone= TimeZone.getTimeZone("GMT")

        val headers = HttpHeaders()
        headers.set(HttpHeaders.EXPIRES, formatter.format(cacheService.getTimeByIcaoType(icao, type)))

        return headers;
    }
}
