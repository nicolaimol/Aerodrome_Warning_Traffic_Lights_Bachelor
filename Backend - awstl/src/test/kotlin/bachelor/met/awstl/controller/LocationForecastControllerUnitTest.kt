package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.dto.locationforecast.Properties
import bachelor.met.awstl.dto.locationforecast.Timeseries
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.service.LocationForecastService
import bachelor.met.awstl.util.ExpireHeader
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito
import org.springframework.http.HttpStatus


@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class LocationForecastControllerUnitTest {

    private var service: LocationForecastService? = null
    private var controller: LocationForecastController? = null
    private var expireHeader: ExpireHeader? = null

    @BeforeEach
    fun setUp() {
        service = Mockito.mock(LocationForecastService::class.java)
        expireHeader = Mockito.mock(ExpireHeader::class.java)
        controller = LocationForecastController(service!!, expireHeader!!)
    }

    @Test
    fun getLocationForecastSuccess() {
        val properties = Properties()

        val dto = LocationForecastDto()
        dto.properties = properties

        val list = ArrayList<Timeseries>()
        for (i in 0..60)
        {

            val data = Timeseries()
            data.time = "hei"
            list.add(data)

        }
        properties.timeseries = list.toTypedArray()

        Mockito.`when`(service!!.getForecast("test")).thenReturn(dto)

        val res = controller!!.getLocationForecastIcao("test")


        assertThat(res.body).isEqualTo(dto)
        assertThat(res.statusCode).isEqualByComparingTo(HttpStatus.OK)
    }

    @Test
    fun getLocationForeacastBadRequest() {

        Mockito.`when`(service!!.getForecast("test")).thenThrow(AirportNotFoundException("feil"))

        val exception = assertThrows<AirportNotFoundException> {
            val result = controller!!.getLocationForecastIcao("test")
        }

        //assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.BAD_REQUEST)
        assertThat(exception.message).isEqualTo("feil")

    }

    @Test
    fun getLocationForecastInternalError() {
        Mockito.`when`(service!!.getForecast("test")).thenThrow(IllegalArgumentException("feil"))

        val exception = assertThrows<IllegalArgumentException> {
            val result = controller!!.getLocationForecastIcao("test")
        }

        assertThat(exception.message).isEqualTo("feil")
    }
}
