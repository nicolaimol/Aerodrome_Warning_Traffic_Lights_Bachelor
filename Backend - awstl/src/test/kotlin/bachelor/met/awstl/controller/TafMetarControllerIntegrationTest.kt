package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.TafMetarDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.exception.handler.InternalExceptionHandler
import bachelor.met.awstl.service.TafMetarService
import org.hamcrest.Matchers
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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@ContextConfiguration(classes = [TafMetarController::class])
@WebMvcTest(TafMetarController::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class TafMetarControllerIntegrationTest {

    @Autowired
    var mockMvc: MockMvc? = null

    @MockBean
    var service: TafMetarService? = null

    @BeforeAll
    fun setUp () {
        mockMvc = MockMvcBuilders
            .standaloneSetup(TafMetarController(service!!))
            .setControllerAdvice(InternalExceptionHandler())
            .build()
    }


    @Test
    fun getTafMetarSuccess() {

        Mockito.`when`(service!!.getMetar("test")).thenReturn(TafMetarDto("taf", "metar"))

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/tafmetar")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.taf", Matchers.`is`("taf")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.metar", Matchers.`is`("metar")))
    }

    @Test
    fun getTafMetarBadRequest() {
        Mockito.`when`(service!!.getMetar("test")).thenThrow(AirportNotFoundException("feil"))

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/tafmetar")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().string("feil"))
    }

    @Test
    fun getTafMetarInternalError() {

        Mockito.`when`(service!!.getMetar("test")).thenThrow(IllegalArgumentException("feil"))

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/tafmetar")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isInternalServerError)
            .andExpect(content().string("feil"))

    }

    @Test
    fun getTafMetarNoParam() {

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/tafmetar")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)

    }
}
