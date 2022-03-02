package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.TafMetarDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.service.TafMetarService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito
import org.springframework.http.HttpStatus

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class TafMetarControllerUnitTest {

    var service: TafMetarService? = null
    var controller: TafMetarController? = null

    @BeforeEach
    fun setUp () {
        service = Mockito.mock(TafMetarService::class.java)
        controller = TafMetarController(service!!)
    }

    @Test
    fun getTafMetarSuccess() {
        val dto = TafMetarDto("taf", "metar")

        Mockito.`when`(service!!.getMetar("test")).thenReturn(dto)
        val result = controller!!.getTafMetar("test")

        assertThat(result.body).isEqualTo(dto)
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)

    }

    @Test
    fun getTafMetarBadRequest() {

        Mockito.`when`(service!!.getMetar("test")).thenThrow(AirportNotFoundException("feil"))
        val result = controller!!.getTafMetar("test")

        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.BAD_REQUEST)
        assertThat(result.body).isEqualTo("feil")
    }

    @Test
    fun getTafMetarInternalError() {

        Mockito.`when`(service!!.getMetar("test")).thenThrow(IllegalArgumentException("feil"))

        val result = controller!!.getTafMetar("test")

        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.INTERNAL_SERVER_ERROR)
        assertThat(result.body).isEqualTo("feil")
    }
}
