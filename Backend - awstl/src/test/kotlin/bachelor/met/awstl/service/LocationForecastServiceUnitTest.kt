package bachelor.met.awstl.service

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.dto.locationforecast.Properties
import bachelor.met.awstl.dto.locationforecast.Timeseries
import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.model.Flyplass
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class LocationForecastServiceUnitTest{

    var service: LocationForecastService? = null
    var httpService: HttpService? = null
    var flyplassService: FlyplassService? = null
    var cacheService: CacheService? = null

    @BeforeEach
    fun setUp () {
        httpService = Mockito.mock(HttpService::class.java)
        flyplassService = Mockito.mock(FlyplassService::class.java)
        cacheService = Mockito.mock(CacheService::class.java)
        service = LocationForecastService(httpService!!, flyplassService!!, cacheService!!)
        service!!.url = "test"
    }

    @Test
    fun testGetForecastOk () {
        val map = HashMap<String, String>()
        map["lat"] = "1"
        map["lon"] = "2"
        map["altitude"] = "3"

        val flyplass = Flyplass("ENGM", "tets", "test", "3", "1","2", "")
        val dto = LocationForecastDto()
        dto.type = "test"

        val list = ArrayList<Timeseries>()
        for (i in 0..99) {
            list.add(Timeseries())
        }

        dto.properties = Properties()
        dto.properties!!.timeseries = list.toArray(arrayOf<Timeseries>())

        Mockito.doNothing().`when`(cacheService!!).chechCache("test", Cache.LOCFOR)
        Mockito.`when`(flyplassService!!.getFlyplass("test")).thenReturn(flyplass)
        Mockito.`when`(httpService!!.hentData("test", LocationForecastDto::class.java, map, "test", Cache.LOCFOR))
            .thenReturn(dto)

        val returnValue = service!!.getForecast("test")


        Mockito.verify(httpService, Mockito.times(1))!!
            .hentData("test", LocationForecastDto::class.java, map, "test", Cache.LOCFOR)
        assert(returnValue!!.properties!!.timeseries!!.size == 58)
    }

    @Test
    fun testGetForecastCachefail() {
        val map = HashMap<String, String>()
        map["lat"] = "1"
        map["lon"] = "2"
        map["altitude"] = "3"

        val flyplass = Flyplass("ENGM", "tets", "test", "3", "1","2", "")
        val dto = LocationForecastDto()
        dto.type = "test"

        val list = ArrayList<Timeseries>()
        for (i in 0..99) {
            list.add(Timeseries())
        }

        dto.properties = Properties()
        dto.properties!!.timeseries = list.toArray(arrayOf<Timeseries>())

        val spy = Mockito.spy(service!!)

        Mockito.doNothing().`when`(cacheService!!).chechCache("test", Cache.LOCFOR)
        Mockito.`when`(flyplassService!!.getFlyplass("test")).thenReturn(flyplass)
        Mockito.`when`(httpService!!.hentData("test", LocationForecastDto::class.java, map, "test", Cache.LOCFOR))
            .thenReturn(dto)
        Mockito.`when`(spy.getForecastCache("test")).thenThrow(RuntimeException())

        try {
            spy!!.getForecast("test")
        } catch (_: Exception) {}


        Mockito.verify(spy, Mockito.times(1)).getLocationForeacastDefault("test")
        Mockito.verify(httpService, Mockito.times(2))!!
            .hentData("test", LocationForecastDto::class.java, map, "test", Cache.LOCFOR)
    }

}
