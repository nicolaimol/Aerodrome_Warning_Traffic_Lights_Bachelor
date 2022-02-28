package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.TafMetarDto
import bachelor.met.awstl.service.NowcastService
import bachelor.met.awstl.service.TafMetarService
import org.hamcrest.Matchers
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content

import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(TafMetarController::class)
internal class TafMetarControllerTest {

    @Autowired
    var mockMvc: MockMvc? = null

    @MockBean
    var service: TafMetarService? = null


    @Test
    fun getTafMetarSuccess() {

        Mockito.`when`(service!!.getMetar("test")).thenReturn(TafMetarDto("taf", "metar"))

        mockMvc?.perform(MockMvcRequestBuilders
            .get("/api/tafmetar")
            .param("icao", "test")
            .contentType(MediaType.APPLICATION_JSON)
        )
            ?.andExpect(status().isOk)
            ?.andExpect(MockMvcResultMatchers.jsonPath("$.taf", Matchers.`is`("taf")))
            ?.andExpect(MockMvcResultMatchers.jsonPath("$.metar", Matchers.`is`("metar")))
    }

    @Test
    fun getTafMetarBadRequest() {
        Mockito.`when`(service!!.getMetar("test")).thenThrow(IllegalArgumentException("feil"))

        mockMvc?.perform(MockMvcRequestBuilders
            .get("/api/tafmetar")
            .param("icao", "test")
            .contentType(MediaType.APPLICATION_JSON)
        )
            ?.andExpect(status().isBadRequest)
            ?.andExpect(content().string("feil"))
    }

    @Test
    fun getTafMetarNoParam() {

        mockMvc?.perform(MockMvcRequestBuilders
            .get("/api/tafmetar")
            .contentType(MediaType.APPLICATION_JSON)
        )
            ?.andExpect(status().isBadRequest)

    }
}
