package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.exception.handler.AirportNotFoundExceptionHandler
import bachelor.met.awstl.exception.handler.InternalExceptionHandler
import bachelor.met.awstl.service.CacheService
import bachelor.met.awstl.service.NowcastService
import bachelor.met.awstl.util.ExpireHeader
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders

@ContextConfiguration(classes = [NowcastController::class])
@WebMvcTest(NowcastController::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class NowcastControllerIntegrationTest {

    @Autowired
    var mockMvc: MockMvc? = null

    @MockBean
    var service: NowcastService? = null

    @MockBean
    var cacheService: CacheService? = null

    @MockBean
    var expireHeader: ExpireHeader? = null

    @BeforeAll
    fun setUp () {
        mockMvc = MockMvcBuilders
            .standaloneSetup(NowcastController(service!!, cacheService!!, expireHeader!!))
            .setControllerAdvice(InternalExceptionHandler(), AirportNotFoundExceptionHandler())
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
            .andDo(MockMvcResultHandlers.print())
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
            .andExpect(jsonPath("$.message").value("feil"))
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
