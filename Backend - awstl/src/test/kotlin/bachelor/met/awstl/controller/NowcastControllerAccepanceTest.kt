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
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import redis.embedded.RedisServer

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class NowcastControllerAccepanceTest {

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

        val enbr = Flyplass("ENBR", "Bergen Lufthavn, Flesland",
            "BGO", "166", "60.3", "5.22", arrayOf(rullebaneRepo!!.save(Rullebane(""))))

        val enva = Flyplass("ENVA", "Trondheim Lufthavn, Værnes",
            "TRD", "56", "63.45", "10.91", arrayOf(rullebaneRepo!!.save(Rullebane(""))))

        val enzv = Flyplass("ENZV", "Stavanger Lufthavn, Sola",
            "SVG", "29", "58.88", "5.63", arrayOf(rullebaneRepo!!.save(Rullebane(""))))
        repo!!.saveAll(listOf(engm, enbr, enva, enzv))
    }

    @AfterAll
    fun tearDown() {
        redisServer!!.stop()

        repo!!.deleteAll()
    }

    @Test
    fun getNowcastSuccess() {
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .param("icao", "engm")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
    }

    @Test
    fun getNowcastBadRequest() {
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .param("icao", "test")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().string("Airport with icao TEST not found"))
    }

    @Test
    fun getNowcastNoParam() {
        mockMvc!!.perform(
            MockMvcRequestBuilders
                .get("/api/nowcast")
                .contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andDo(MockMvcResultHandlers.print())
    }
}
