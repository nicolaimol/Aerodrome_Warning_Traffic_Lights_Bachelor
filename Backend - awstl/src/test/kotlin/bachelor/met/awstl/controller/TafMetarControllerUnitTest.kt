package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.TafMetarDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.service.TafMetarService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
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

        Mockito.`when`(service!!.getTafMetar("test")).thenReturn(dto)
        val result = controller!!.getTafMetar("test")

        assertThat(result.body).isEqualTo(dto)
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)

    }

    @Test
    fun getTafMetarBadRequest() {

        Mockito.`when`(service!!.getTafMetar("test")).thenThrow(AirportNotFoundException("feil"))
        val exception = assertThrows<AirportNotFoundException> {
            val result = controller!!.getTafMetar("test")
        }


        //assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.BAD_REQUEST)
        assertThat(exception.message).isEqualTo("feil")
    }

    @Test
    fun getTafMetarInternalError() {

        Mockito.`when`(service!!.getTafMetar("test")).thenThrow(IllegalArgumentException("feil"))

        val exception = assertThrows<IllegalArgumentException> {
            val result = controller!!.getTafMetar("test")
        }

        //assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.INTERNAL_SERVER_ERROR)
        assertThat(exception.message).isEqualTo("feil")
    }
}
