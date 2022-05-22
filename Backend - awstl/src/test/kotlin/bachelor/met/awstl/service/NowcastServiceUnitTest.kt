package bachelor.met.awstl.service

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.dto.locationforecast.*
import bachelor.met.awstl.dto.nowcast.Nowcast
import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.model.Flyplass
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito
import org.springframework.data.redis.RedisConnectionFailureException
import org.springframework.web.client.HttpClientErrorException

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class NowcastServiceUnitTest {


    var service: NowcastService? = null
    var httpService: HttpService? = null
    var flyplassService: FlyplassService? = null
    var cacheService: CacheService? = null

    @BeforeEach
    fun setUp() {
        httpService = Mockito.mock(HttpService::class.java)
        flyplassService = Mockito.mock(FlyplassService::class.java)
        cacheService = Mockito.mock(CacheService::class.java)
        service = NowcastService(httpService!!, flyplassService!!, cacheService!!)

        service!!.url = "https://aa043aa717wu6655h.api.met.no/weatherapi/nowcast/2.0/complete?altitude={altitude}&lat={lat}&lon={lon}"
        service!!.locationForecast = "https://aa043aa717wu6655h.api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}"
    }

    @Test
    fun testGetNowcast() {
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", "")

        val spy = Mockito.spy(service)
        val dto = NowcastDto()

        Mockito.`when`(flyplassService!!.getFlyplass("TEST")).thenReturn(flyplass)
        Mockito.`when`(flyplassService!!.getFlyplass("ENGM")).thenReturn(flyplass)
        Mockito.`when`(flyplassService!!.getFlyplass("ENBR")).thenReturn(flyplass)
        Mockito.`when`(flyplassService!!.getFlyplass("ENVA")).thenReturn(flyplass)

        Mockito.doNothing().`when`(spy!!).getWeather(arrayOf(flyplass, flyplass, flyplass, flyplass), dto)

        spy.getNowcast("test")

        //Mockito.verify(spy, Mockito.times(1)).getWeather(arrayOf(flyplass, flyplass, flyplass, flyplass), dto)

    }

    @Test
    fun testGetForAirportFail() {

        val query = HashMap<String, String>()

        val locationForecastDto = LocationForecastDto()
        locationForecastDto.properties = Properties()

        val nextOneHours = NextOneHours()
        nextOneHours.summary = Summary()
        nextOneHours.summary!!.symbol_code = "test"

        val timeseries = Timeseries()
        timeseries.data = Data()
        timeseries.data!!.instant = Instant()
        timeseries.data!!.instant!!.details = HashMap()
        timeseries.data!!.next_1_hours = nextOneHours



        locationForecastDto.properties!!.timeseries = arrayOf(timeseries)



        Mockito.`when`(httpService!!.hentData(
            "https://aa043aa717wu6655h.api.met.no/weatherapi/nowcast/2.0/complete?altitude={altitude}&lat={lat}&lon={lon}"
            , Nowcast::class.java, query, "test", Cache.NOWCAST)).thenThrow(HttpClientErrorException.UnprocessableEntity::class.java)

        Mockito.`when`(httpService!!.hentData(
            "https://aa043aa717wu6655h.api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}"            , LocationForecastDto::class.java, query, "test", Cache.NOWCAST)).thenReturn(locationForecastDto)

        service!!.getForAirport("test", query)

        Mockito.verify(httpService, Mockito.times(1))!!.hentData(
            "https://aa043aa717wu6655h.api.met.no/weatherapi/nowcast/2.0/complete?altitude={altitude}&lat={lat}&lon={lon}"
            , Nowcast::class.java, query, "test", Cache.NOWCAST)
        Mockito.verify(httpService, Mockito.times(1))!!.hentData(
            "https://aa043aa717wu6655h.api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}"            , LocationForecastDto::class.java, query, "test", Cache.NOWCAST)



    }

    @Test
    fun testGetWeatherRedisFail() {
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", "")
        val dto = NowcastDto()
        val nowcast = Nowcast()
        val spy = Mockito.spy(service)

        val query = HashMap<String, String>()
        query["lat"] = ""
        query["lon"] = ""
        query["altitude"] = ""

        Mockito.doNothing().`when`(cacheService!!).chechCache("ENGM", Cache.NOWCAST)

        Mockito.`when`(spy!!.getForAirportDefault("ENGM", query)).thenReturn(nowcast)

        Mockito.`when`(spy!!.getForAirportCache("ENGM", query)).thenThrow(RedisConnectionFailureException("test"))
        //Mockito.`when`(spy.getForAirportCache("ENGM", query)).thenThrow(RedisConnectionFailureException::class.java)
        //Mockito.`when`(spy.getForAirportCache("ENBR", query)).thenThrow(RedisConnectionFailureException::class.java)
        //Mockito.`when`(spy.getForAirportCache("ENVA", query)).thenThrow(RedisConnectionFailureException::class.java)


/*
        Mockito.`when`(spy.getForAirportDefault("test", query)).thenReturn(nowcast)

        Mockito.`when`(spy.getForAirportDefault("ENBR", query)).thenReturn(nowcast)
        Mockito.`when`(spy.getForAirportDefault("ENVA", query)).thenReturn(nowcast)


 */



        try {
            spy.getWeather(arrayOf(flyplass, flyplass, flyplass, flyplass), dto)
        } catch (_: RedisConnectionFailureException) {

        }

        assertThat((dto.nowcasts).contains(nowcast))
        Mockito.verify(spy, Mockito.times(2)).getForAirportCache("ENGM", query)
        //Mockito.verify(spy, Mockito.times(2)).getForAirportCache("ENGM", query)
        //Mockito.verify(spy, Mockito.times(1)).getForAirportCache("ENBR", query)
        //Mockito.verify(spy, Mockito.times(1)).getForAirportCache("ENVA", query)

        Mockito.verify(spy, Mockito.times(2)).getForAirportDefault("ENGM", query)
        //Mockito.verify(spy, Mockito.times(1)).getForAirportDefault("ENGM", query)
        //Mockito.verify(spy, Mockito.times(1)).getForAirportDefault("ENBR", query)
        //Mockito.verify(spy, Mockito.times(1)).getForAirportDefault("ENVA", query)



    }

}
