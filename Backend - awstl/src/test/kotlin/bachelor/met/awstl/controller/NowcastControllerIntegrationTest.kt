package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.exception.InternalExceptionHandler
import bachelor.met.awstl.service.NowcastService
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

@ContextConfiguration(classes = [NowcastController::class])
@WebMvcTest(NowcastController::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class NowcastControllerIntegrationTest {

    @Autowired
    var mockMvc: MockMvc? = null

    @MockBean
    var service: NowcastService? = null

    @BeforeAll
    fun setUp () {
        mockMvc = MockMvcBuilders
            .standaloneSetup(NowcastController(service!!))
            .setControllerAdvice(InternalExceptionHandler())
            .build()
    }


    @Test
    fun getNowcastSuccess(){
        val expect = NowcastDto()
        Mockito.`when`(service?.getNowcast("test")).thenReturn(expect)

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
    }

    @Test
    fun getNowcastBadRequest() {

        Mockito.`when`(service!!.getNowcast("test")).thenThrow(AirportNotFoundException("feil"))

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().string("feil"))
    }

    @Test
    fun getNowcastInternalError() {

        Mockito.`when`(service!!.getNowcast("test")).thenThrow(IllegalArgumentException("feil"))

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isInternalServerError)
            .andExpect(content().string("feil"))
    }


    @Test
    fun getNowcastWithoutParam() {

        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
    }
}
