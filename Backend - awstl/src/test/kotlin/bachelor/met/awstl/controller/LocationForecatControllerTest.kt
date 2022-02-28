package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.dto.locationforecast.Properties
import bachelor.met.awstl.dto.locationforecast.Timeseries
import bachelor.met.awstl.service.LocationForecastService
import bachelor.met.awstl.service.NowcastService
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(LocationForecastController::class)
internal class LocationForecatControllerTest {

    @Autowired
    var mockMvc: MockMvc? = null

    @MockBean
    var service: LocationForecastService? = null

    @Test
    fun locationForecastSuccess() {
        val properties = Properties()

        val dto = LocationForecastDto()
        dto.properties = properties

        val list = ArrayList<Timeseries>()
        for (i in 0..100)
        {

            val data = Timeseries()
            data.time = "hei"
            list.add(data)

        }
        properties.timeseries = list.toTypedArray()

        Mockito.`when`(service?.getForecast("test")).thenReturn(dto)

        mockMvc?.perform(
            MockMvcRequestBuilders
                .get("/api/locationforecast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )?.andExpect(status().isOk)
    }

    @Test
    fun locationForecastBadRequest() {

        Mockito.`when`(service?.getForecast("test")).thenThrow(IllegalArgumentException("feil"))

        mockMvc?.perform(
            MockMvcRequestBuilders
                .get("/api/locationforecast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            ?.andExpect(status().isBadRequest)
            ?.andExpect(content().string("feil"))
    }
}
