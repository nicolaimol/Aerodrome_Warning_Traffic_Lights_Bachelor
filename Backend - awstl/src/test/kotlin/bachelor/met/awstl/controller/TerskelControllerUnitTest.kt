package bachelor.met.awstl.controller


import bachelor.met.awstl.dto.TerskelDeleteDto
import bachelor.met.awstl.dto.TerskelverdiDto
import bachelor.met.awstl.model.Terskelverdi
import bachelor.met.awstl.service.TerskelverdiService
import org.assertj.core.api.Assertions
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseCookie
import java.time.Duration

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class TerskelControllerUnitTest {

    var service: TerskelverdiService? = null
    var controller: TerskelverdiController? = null

    @BeforeEach
    fun setup() {
        service = Mockito.mock(TerskelverdiService::class.java)
        controller = TerskelverdiController(service!!)
    }

    @Test
    fun testGetTerskelverdiSuccess() {

        val dto = TerskelverdiDto()

        Mockito.`when`(service!!.getTerskelverdi("test")).thenReturn(dto)

        val result = controller!!.getTerskel("test")

        assertThat(result.body).isEqualTo(dto)
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)

    }

    @Test
    fun testGetTerskelverdiFailure() {



        val result = controller!!.getTerskel("")

        assertThat(result.body).isNull()
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.NOT_FOUND)

    }

    @Test
    fun testSaveTerskelverdiSuccess() {

        val dto = TerskelverdiDto()

        Mockito.`when`(service!!.addTerskelverdi(dto)).thenReturn("test")

        val result = controller!!.setTerskel("",dto)
        val cookie: ResponseCookie = ResponseCookie.from("terskel", "test").maxAge(Duration.ofDays(365*10)).build()


        assertThat(result.body).isEqualTo(null)
        assertThat(result.headers[HttpHeaders.SET_COOKIE]?.get(0) ?: "").isEqualTo(cookie.toString())
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)

    }

    @Test
    fun testUpdateTerskelverdiSuccess() {

        val dto = TerskelverdiDto()

        Mockito.`when`(service!!.updateTerskelverdi("test", dto)).thenReturn(null)

        val result = controller!!.setTerskel("test",dto)

        assertThat(result.body).isEqualTo(null)
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)

    }

    @Test
    fun testGetAllTerskelverdiSuccess() {

        val terskel = Terskelverdi()

        Mockito.`when`(service!!.getAll()).thenReturn(listOf(terskel))

        val result = controller!!.getAll()

        assertThat(result.body).isEqualTo(listOf(terskel))
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)

    }

    @Test
    fun testDeleteTerskelverdiSuccess() {

        val dto = TerskelDeleteDto("test")

        val result = controller!!.deleteById(dto)

        assertThat(result.body).isEqualTo(null)
        assertThat(result.statusCode).isEqualByComparingTo(HttpStatus.OK)

    }

}
