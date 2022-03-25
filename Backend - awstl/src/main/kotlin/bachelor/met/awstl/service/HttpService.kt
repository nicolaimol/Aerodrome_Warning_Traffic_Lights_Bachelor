package bachelor.met.awstl.service

import bachelor.met.awstl.exception.TafMetarNotAvailableException
import bachelor.met.awstl.exception.UnknownHostException
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.util.HashMap
import org.springframework.web.client.ResourceAccessException
import kotlin.reflect.typeOf

@Service
class HttpService(private val template: RestTemplate) {

    fun <T> hentData(url: String, clazz: Class<T>, query: HashMap<String, String>): T {
        try {
            val result: T? = template.getForObject(url, clazz, query)!!
            if (result == null && clazz == String::class) {
                throw TafMetarNotAvailableException("Taf metar un available")
            }

            return result!!
        } catch (e: ResourceAccessException) {
            throw UnknownHostException(e.message)
        }
    }
}
