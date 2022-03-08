package bachelor.met.awstl.service

import bachelor.met.awstl.exception.UnknownHostException
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.util.HashMap
import org.springframework.web.client.ResourceAccessException

@Service
class HttpService(private val template: RestTemplate) {

    fun <T> hentData(url: String, clazz: Class<T>, query: HashMap<String, String>): T {
        return try {
            template.getForObject(url, clazz, query)!!
        } catch (e: ResourceAccessException) {
            throw UnknownHostException(e.message)
        }
    }
}
