package bachelor.met.awstl.controller

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import bachelor.met.awstl.controller.NowcastController
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.boot.test.mock.mockito.MockBean
import bachelor.met.awstl.service.NowcastService
import kotlin.Throws
import bachelor.met.awstl.dto.NowcastDto
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.lang.IllegalArgumentException
import org.springframework.test.web.servlet.ResultMatcher
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import java.lang.Exception

@WebMvcTest(NowcastController::class)
internal class NowcastControllerTest {

    @Autowired
    var mockMvc: MockMvc? = null

    @MockBean
    var service: NowcastService? = null


    @Test
    fun nowCastSuccess(){
        val expect = NowcastDto()
        Mockito.`when`(service?.getNowcast("test")).thenReturn(expect)
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun nowCastBadRequestt() {
        Mockito.`when`(service!!.getNowcast("test")).thenThrow(IllegalArgumentException("feil"))
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
            .andExpect(content().string("feil"))
    }


    @Test
    fun nowcastWithoutParam() {
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(MockMvcResultMatchers.status().isBadRequest)
    }
}
