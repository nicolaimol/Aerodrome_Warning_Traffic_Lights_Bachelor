package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.service.NowcastService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.springframework.http.HttpStatus

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class NowcastControllerUnitTest {

    var service: NowcastService? = null
    var controller: NowcastController? = null

    @BeforeEach
    fun setUp () {
        service = Mockito.mock(NowcastService::class.java)
        controller = NowcastController(service!!)
    }

    @Test
    fun getNowcastSuccess() {
        val dto = NowcastDto()

        Mockito.`when`(service!!.getNowcast("test")).thenReturn(dto)

        val result = controller!!.getNowCast("test")

        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)
        assertThat(result.body).isEqualTo(dto)

    }

    @Test
    fun getNowcastBadRequest() {
        Mockito.`when`(service!!.getNowcast("test")).thenThrow(IllegalArgumentException("feil"))

        val result = controller!!.getNowCast("test")

        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.BAD_REQUEST)
        assertThat(result.body).isEqualTo("feil")
    }
}
