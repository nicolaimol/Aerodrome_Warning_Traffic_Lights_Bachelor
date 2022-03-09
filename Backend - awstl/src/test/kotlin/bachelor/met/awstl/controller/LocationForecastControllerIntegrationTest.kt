package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.LocationForecastDto
import bachelor.met.awstl.dto.locationforecast.Properties
import bachelor.met.awstl.dto.locationforecast.Timeseries
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.exception.handler.InternalExceptionHandler
import bachelor.met.awstl.service.LocationForecastService
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@ContextConfiguration(classes = [LocationForecastController::class])
@WebMvcTest(LocationForecastController::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class LocationForecastControllerIntegrationTest {

    @Autowired
    var mockMvc: MockMvc? = null

    @MockBean
    var service: LocationForecastService? = null

    @BeforeAll
    fun setUp () {
        mockMvc = MockMvcBuilders
            .standaloneSetup(LocationForecastController(service!!))
            .setControllerAdvice(InternalExceptionHandler())
            .build()
    }

    @Test
    fun getLocationForecastSuccess() {
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

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/locationforecast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
    }

    @Test
    fun getLocationForecastBadRequest() {

        Mockito.`when`(service?.getForecast("test")).thenThrow(AirportNotFoundException("feil"))

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/locationforecast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().string("feil"))
    }

    @Test
    fun getLocationForecastInternalError() {

        Mockito.`when`(service!!.getForecast("test")).thenThrow(IllegalArgumentException("feil"))

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/locationforecast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isInternalServerError)
            .andExpect(jsonPath("$.message").value("feil"))

    }

    @Test
    fun getLocationForecastNoParam() {

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/locationforecast")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)

    }

}
