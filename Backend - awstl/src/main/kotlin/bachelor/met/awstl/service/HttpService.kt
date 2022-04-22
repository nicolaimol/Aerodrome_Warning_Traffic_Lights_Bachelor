package bachelor.met.awstl.service

import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.exception.TafMetarNotAvailableException
import bachelor.met.awstl.exception.UnknownHostException
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.util.HashMap
import org.springframework.web.client.ResourceAccessException
import kotlin.reflect.typeOf

@Service
class HttpService(private val template: RestTemplate, private val cacheService: CacheService) {

    fun <T> hentData(url: String, clazz: Class<T>, query: HashMap<String, String>): T {
        try {

            val result: T? = template.getForObject(url, clazz, query)

            return result!!
        } catch (e: ResourceAccessException) {
            throw UnknownHostException(e.message)
        } catch (e: NullPointerException) {
            when (clazz) {
                String::class.java -> throwTafMetarException()
            }

            throw NullPointerException(e.message)
        }
    }

    fun <T> hentData(url: String, clazz: Class<T>, query: HashMap<String, String>, icao: String, type: Cache): T {
        try {

            val result: ResponseEntity<T> = template.getForEntity(url, clazz, query)

            cacheService.setTimeInCache(result.headers["expires"]?.get(0)!!, icao, type)


            return result.body!!
        } catch (e: ResourceAccessException) {
            throw UnknownHostException(e.message)
        } catch (e: NullPointerException) {
            when (clazz) {
                String::class.java -> throwTafMetarException()
            }

            throw NullPointerException(e.message)
        }
    }

    private fun throwTafMetarException() {
        throw TafMetarNotAvailableException("Taf metar un available")
    }

}
