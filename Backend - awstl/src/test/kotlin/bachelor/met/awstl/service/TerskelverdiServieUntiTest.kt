package bachelor.met.awstl.service

import bachelor.met.awstl.dto.FlyplassDto
import bachelor.met.awstl.dto.TerskelverdiDto
import bachelor.met.awstl.exception.TerskelverdiNotFoundException
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.model.Rullebane
import bachelor.met.awstl.model.Terskelverdi
import bachelor.met.awstl.repo.ITerskelverdiRepo
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito
import java.util.*


@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class TerskelverdiServieUntiTest {

    var service: TerskelverdiService? = null
    var repo: ITerskelverdiRepo? = null
    var flyplassService: FlyplassService? = null


    @BeforeEach
    fun setUp() {
        repo = Mockito.mock(ITerskelverdiRepo::class.java)
        flyplassService = Mockito.mock(FlyplassService::class.java)
        service = TerskelverdiService(repo!!, flyplassService!!)
    }

    @Test
    fun testGetTerskelByIdOk() {
        val terskel = Terskelverdi()

        Mockito.`when`(repo!!.findById("test")).thenReturn(Optional.of(terskel))

        val result = service!!.getTerskelById("test")
        assert(result == terskel)
    }

    @Test
    fun testGetTerskelByIdNotFound() {
        Mockito.`when`(repo!!.findById("test")).thenReturn(Optional.empty())

        assertThrows<TerskelverdiNotFoundException> {
            service!!.getTerskelById("test")
        }
    }

    @Test
    fun testGetAllTerskel() {
        val list = listOf(Terskelverdi())

        Mockito.`when`(repo!!.findAll()).thenReturn(list)

        val result = service!!.getAll()
        assert(result == list)


        Mockito.verify(repo, Mockito.times(1))!!.findAll()
    }

    @Test
    fun testDeleteterskel() {
        val spy = Mockito.spy(service)
        val terskel = Terskelverdi()
        terskel.id = "test"

        Mockito.doReturn(terskel).`when`(spy!!).getTerskelById("test")
        Mockito.doNothing().`when`(repo)!!.delete(terskel)

        spy.deleteById("test")

        Mockito.verify(spy, Mockito.times(1))!!.getTerskelById("test")
        Mockito.verify(spy, Mockito.times(1))!!.deleteById(terskel.id)
        Mockito.verify(repo, Mockito.times(1))!!.delete(terskel)

    }

    @Test
    fun testGetTerskelverdi() {
        val base = String(Base64.getEncoder().encode("test".toByteArray()))
        val spy = Mockito.spy(service)
        val terskel = Terskelverdi()

        Mockito.doReturn(terskel).`when`(spy)!!.getTerskelById("test")

        val result = spy!!.getTerskelverdi(base)
        assertThat(result)
            .usingRecursiveComparison()
            .isEqualTo(TerskelverdiDto(terskel))
    }

    @Test
    fun testUpdateTerskelverdi() {
        val base = String(Base64.getEncoder().encode("test".toByteArray()))
        val spy = Mockito.spy(service)
        val terskel = Terskelverdi()//Mockito.spy(Terskelverdi())
        val dto = TerskelverdiDto()
        dto.flyplass = FlyplassDto("Oslo", "ENGM", arrayOf(Rullebane("")))
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", arrayOf(Rullebane("")))

        Mockito.doReturn(terskel).`when`(spy)!!.getTerskelById("test")
        Mockito.doReturn(flyplass).`when`(flyplassService)!!.getFlyplass(dto.flyplass!!.icao!!)
        Mockito.doReturn(terskel).`when`(repo)!!.save(terskel)

        spy!!.updateTerskelverdi(base, dto)


        //Mockito.verify(terskel, Mockito.times(1))!!.update(dto)
        Mockito.verify(flyplassService, Mockito.times(1))!!
            .getFlyplass(dto.flyplass!!.icao!!)
        Mockito.verify(repo, Mockito.times(1))!!.save(terskel)
        assertThat(terskel.flyplass).isEqualTo(flyplass)

    }

    @Test
    fun testAddTerskelverdi() {

        val spy = Mockito.spy(service)

        val dto = TerskelverdiDto()
        dto.flyplass = FlyplassDto("Oslo", "ENGM", arrayOf(Rullebane("")))
        val terskel = Terskelverdi("test", dto)
        val flyplass = Flyplass("ENGM", "Oslo", "OSL", "", "", "", arrayOf(Rullebane("")))


        Mockito.doReturn("test").`when`(spy)!!.random()
        Mockito.doReturn(Optional.empty<Terskelverdi>()).`when`(repo)!!.findById("test")
        Mockito.doReturn(terskel).`when`(repo)!!.save(terskel)
        Mockito.doReturn(flyplass).`when`(flyplassService)!!.getFlyplass(dto.flyplass!!.icao!!)

        val result = spy!!.addTerskelverdi(dto)

        Mockito.verify(flyplassService, Mockito.times(1))!!
            .getFlyplass(dto.flyplass!!.icao!!)
        //Mockito.verify(repo, Mockito.times(1))!!.save(terskel)
        assertThat(result)
            .isEqualTo(Base64.getEncoder().encodeToString("test".encodeToByteArray()))


    }



}
