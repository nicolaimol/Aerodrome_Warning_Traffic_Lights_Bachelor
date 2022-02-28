package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.dto.locationforecast.Properties
import bachelor.met.awstl.dto.locationforecast.Timeseries
import bachelor.met.awstl.service.LocationForecastService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito
import org.springframework.http.HttpStatus


@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class LocationForecastControllerUnitTest {

    private var service: LocationForecastService? = null
    private var controller: LocationForecastController? = null

    @BeforeEach
    fun setUp() {
        service = Mockito.mock(LocationForecastService::class.java)
        controller = LocationForecastController(service!!)
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

        Mockito.`when`(service?.getForecast("test")).thenReturn(dto)

        val res = controller?.getLocationForecastIcao("test")

        println(res)

        assertThat(res?.body).isEqualTo(dto)
        assertThat(res?.statusCode).isEqualByComparingTo(HttpStatus.OK)
    }

    @Test
    fun getLocationForeacastBadRequest() {

        Mockito.`when`(service!!.getForecast("test")).thenThrow(IllegalArgumentException("feil"))

        val result = controller?.getLocationForecastIcao("test")

        assertThat(result?.statusCode).isEqualByComparingTo(HttpStatus.BAD_REQUEST)
        assertThat(result?.body).isEqualTo("feil")

    }
}
