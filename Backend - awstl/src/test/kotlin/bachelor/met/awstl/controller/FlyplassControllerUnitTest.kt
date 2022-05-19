package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.FlyplassSlettDto
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.service.FlyplassService
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito
import org.mockito.Mockito.times
import org.springframework.http.HttpStatus

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class FlyplassControllerUnitTest {

    var service: FlyplassService? = null
    var controller: FlyplassController? = null

    @BeforeEach
    fun setup() {
        service = Mockito.mock(FlyplassService::class.java)
        controller = FlyplassController(service!!)
    }

    @Test
    fun testGetFlyplasser() {
        controller!!.getAllAirports()

        Mockito.`when`(service!!.getAllFlyplass()).thenReturn(listOf(Flyplass()))

        val result = controller!!.getAllAirports()

        Mockito.verify(service, times(2))!!.getAllFlyplass()
        assertThat(result.body!!.size).isEqualTo(1)
    }

    @Test
    fun testGetFlyplasserDto() {
        controller!!.getAllAirportsDto()

        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "01/10", "59.91273", "10.74609", "01/19")

        Mockito.`when`(service!!.getAllFlyplass()).thenReturn(listOf( flyplass ))

        val result = controller!!.getAllAirportsDto()

        Mockito.verify(service, times(2))!!.getAllFlyplass()
        assertThat(result.body!!.size).isEqualTo(1)
    }

    @Test
    fun testAddFlyplass() {


        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "01/10", "59.91273", "10.74609", "01/19")

        val result = controller!!.addAirport(flyplass)

        Mockito.verify(service, times(1))!!.addFlyplass(flyplass)
        assertThat(result.statusCode).isEqualTo(HttpStatus.OK)
    }

    @Test
    fun testUpdateFlyplass() {

        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "01/10", "59.91273", "10.74609", "01/19")

        val result = controller!!.updateAirport(flyplass)

        Mockito.verify(service, times(1))!!.updateFlyplass(flyplass.icao, flyplass)
        assertThat(result.statusCode).isEqualTo(HttpStatus.OK)
    }

    @Test
    fun testDeleteFlyplass() {

        val flyplass = FlyplassSlettDto("ENGM")

        val result = controller!!.deleteAirport(flyplass)

        Mockito.verify(service, times(1))!!.deleteFlyplass(flyplass.icao)
        assertThat(result.statusCode).isEqualTo(HttpStatus.OK)
    }

}
