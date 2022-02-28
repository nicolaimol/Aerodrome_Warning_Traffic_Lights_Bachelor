package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.service.NowcastService
import org.junit.jupiter.api.Test
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

@ContextConfiguration(classes = [NowcastController::class])
@WebMvcTest(NowcastController::class)
internal class NowcastControllerIntegrationTest {

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
