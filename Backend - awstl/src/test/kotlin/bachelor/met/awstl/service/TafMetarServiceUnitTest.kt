package bachelor.met.awstl.service

import bachelor.met.awstl.dto.TafMetarDto
import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.model.Flyplass
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito
import org.springframework.data.redis.RedisConnectionFailureException

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class TafMetarServiceUnitTest {

    var service: TafMetarService? = null
    var httpService: HttpService? = null
    var flyplassService: FlyplassService? = null

    @BeforeEach
    fun setUp() {
        httpService = Mockito.mock(HttpService::class.java)
        flyplassService = Mockito.mock(FlyplassService::class.java)
        service = TafMetarService(httpService!!, flyplassService!!)
        service!!.url = "test"
    }

    @Test
    fun testGetTafMetarRedisFail() {
        val spy = Mockito.spy(service)

        val obj = TafMetarDto()

        Mockito.doReturn(obj).`when`(spy!!).getTafMetarDefault("test")
        Mockito.doThrow(RedisConnectionFailureException("test")).`when`(spy).getMetarCache("test")

        val result = spy.getTafMetar("test")
        assert(result == obj)

        Mockito.verify(spy, Mockito.times(1)).getTafMetarDefault("test")
        Mockito.verify(spy, Mockito.times(1)).getMetarCache("test")

    }

    @Test
    fun testGetTafMetarDefault() {
        val dto = TafMetarDto()
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", "")
        val map = HashMap<String, String>()
        map["icao"] = "ENGM"

        Mockito.doReturn(flyplass).`when`(flyplassService)!!.getFlyplass("ENGM")
        Mockito.doReturn("hei \n hei \n hei \n hei \n" +
                " hei \n" +
                " hei \n hei \n" +
                " hei \n" +
                " hei \n hei \n" +
                " hei \n" +
                " hei \n").`when`(httpService)!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)

        service!!.getTafMetarDefault("ENGM")

        Mockito.verify(httpService, Mockito.times(1))!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)
        Mockito.verify(flyplassService, Mockito.times(1))!!
            .getFlyplass("ENGM")

    }

    @Test
    fun testGetTafMetarDefaultFail() {
        val dto = TafMetarDto()
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", "")
        val map = HashMap<String, String>()
        map["icao"] = "ENGM"

        Mockito.doReturn(flyplass).`when`(flyplassService)!!.getFlyplass("ENGM")
        Mockito.doReturn(null).`when`(httpService)!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)

        assertThrows<Exception> {
            service!!.getTafMetarDefault("ENGM")
        }

        Mockito.verify(httpService, Mockito.times(1))!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)
        Mockito.verify(flyplassService, Mockito.times(1))!!
            .getFlyplass("ENGM")

    }

    @Test
    fun testGetTafMetarCache() {
        val dto = TafMetarDto()
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", "")
        val map = HashMap<String, String>()
        map["icao"] = "ENGM"

        Mockito.doReturn(flyplass).`when`(flyplassService)!!.getFlyplass("ENGM")
        Mockito.doReturn("hei \n hei \n hei \n hei \n" +
                " hei \n" +
                " hei \n hei \n" +
                " hei \n" +
                " hei \n hei \n" +
                " hei \n" +
                " hei \n").`when`(httpService)!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)

        service!!.getMetarCache("ENGM")

        Mockito.verify(httpService, Mockito.times(1))!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)
        Mockito.verify(flyplassService, Mockito.times(1))!!
            .getFlyplass("ENGM")

    }

    @Test
    fun testGetTafMetarCacheFail() {
        val dto = TafMetarDto()
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", "")
        val map = HashMap<String, String>()
        map["icao"] = "ENGM"

        Mockito.doReturn(flyplass).`when`(flyplassService)!!.getFlyplass("ENGM")
        Mockito.doReturn(null).`when`(httpService)!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)

        assertThrows<Exception> {
            service!!.getMetarCache("ENGM")
        }

        Mockito.verify(httpService, Mockito.times(1))!!
            .hentData("test", String::class.java,map, "ENGM", Cache.TAFMETAR)
        Mockito.verify(flyplassService, Mockito.times(1))!!
            .getFlyplass("ENGM")

    }
}
