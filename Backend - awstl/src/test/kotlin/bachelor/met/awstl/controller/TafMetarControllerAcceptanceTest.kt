package bachelor.met.awstl.controller

import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.model.Rullebane
import bachelor.met.awstl.repo.IFlyplassRepo
import bachelor.met.awstl.repo.IRullebaneRepo
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultHandlers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.result.StatusResultMatchers
import redis.embedded.RedisServer

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TafMetarControllerAcceptanceTest {

    @Autowired
    val mockMvc: MockMvc? = null

    @Autowired
    var repo: IFlyplassRepo? = null

    @Autowired
    var rullebaneRepo: IRullebaneRepo? = null

    var redisServer: RedisServer? = null

    @BeforeAll
    fun setUp() {
        try {
            redisServer = RedisServer.builder().port(6370).build()
            redisServer!!.start()
        } finally {

        }

        val engm = Flyplass("ENGM", "Oslo Lufthavn, Gardermoen",
            "OSL", "100", "60", "10", arrayOf(rullebaneRepo!!.save(Rullebane(""))))
        repo!!.save(engm)
    }

    @AfterAll
    fun tearDown() {
        redisServer!!.stop()

        repo!!.deleteAll()
    }

    @Test
    fun getTafMetarSuccess() {
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/tafmetar")
                .param("icao", "engm")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)

    }

    @Test
    fun getTafMetarBadRequest() {
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/tafmetar")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andDo(MockMvcResultHandlers.print())
            .andExpect(content().string("Airport with icao test not found"))
    }

    @Test
    fun getTarMetarNoParam() {
        mockMvc!!.perform(MockMvcRequestBuilders
            .get("/api/tafmetar")
            .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
    }
}
