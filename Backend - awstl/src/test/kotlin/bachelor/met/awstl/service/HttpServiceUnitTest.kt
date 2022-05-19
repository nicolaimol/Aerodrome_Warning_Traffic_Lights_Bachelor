package bachelor.met.awstl.service

import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.exception.TafMetarNotAvailableException
import bachelor.met.awstl.exception.UnknownHostException
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito
import org.springframework.http.ResponseEntity
import org.springframework.web.client.ResourceAccessException
import org.springframework.web.client.RestTemplate

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class HttpServiceUnitTest {

    var service: HttpService? = null
    var template: RestTemplate? = null
    var cacheService: CacheService? = null

    @BeforeEach
    fun setUp() {
        template = Mockito.mock(RestTemplate::class.java)
        cacheService = Mockito.mock(CacheService::class.java)

        service = HttpService(template!!, cacheService!!)
    }

    @Test
    fun testHentDataOk() {
        val url = "http://www.google.com"
        val response = "response"

        val responseEntity = ResponseEntity
            .ok()
            .header("expires",  "Thu, 19 May 2022 06:33:37 GMT")
            .body(response)

        val map = HashMap<String, String>()

        Mockito.`when`(template!!.getForEntity(url, String::class.java, map)).thenReturn(responseEntity)
        Mockito.doNothing()
            .`when`(cacheService!!).setTimeInCache( "Thu, 19 May 2022 06:33:37 GMT", "test", Cache.LOCFOR)

        val result = service!!.hentData(url, String::class.java, map, "test", Cache.LOCFOR)

        Mockito.verify(cacheService!!, Mockito.times(1))
            .setTimeInCache(
                "Thu, 19 May 2022 06:33:37 GMT","test", Cache.LOCFOR)

        assert(result == response)
    }

    @Test
    fun testHentDataResourceAccessException() {
        val url = "http://www.google.com"

        val map = HashMap<String, String>()

        Mockito.`when`(template!!.getForEntity(url, String::class.java, map)).thenThrow(ResourceAccessException::class.java)

        assertThrows<UnknownHostException> {
            service!!.hentData(url, String::class.java, map, "test", Cache.LOCFOR)
        }

    }

    @Test
    fun testHentDataNullPointerException() {
        val url = "http://www.google.com"


        val map = HashMap<String, String>()

        Mockito.`when`(template!!.getForEntity(url, String::class.java, map)).thenThrow(NullPointerException::class.java)

        assertThrows<NullPointerException> {
            service!!.hentData(url, String::class.java, map, "test", Cache.LOCFOR)
        }

    }

    @Test
    fun testHentDataTafMetarException() {
        val url = "http://www.google.com"

        val map = HashMap<String, String>()

        Mockito.`when`(template!!.getForEntity(url, String::class.java, map)).thenThrow(NullPointerException::class.java)

        assertThrows<TafMetarNotAvailableException> {
            service!!.hentData(url, String::class.java, map, "test", Cache.TAFMETAR)
        }
    }

}
