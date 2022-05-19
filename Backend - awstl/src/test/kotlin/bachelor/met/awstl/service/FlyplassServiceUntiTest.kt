package bachelor.met.awstl.service

import bachelor.met.awstl.config.CacheConfig
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.repo.IFlyplassRepo
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito
import org.springframework.dao.QueryTimeoutException
import java.util.*

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class FlyplassServiceUntiTest {

    var service: FlyplassService? = null
    var repo: IFlyplassRepo? = null
    var config: CacheConfig? = null

    @BeforeEach
    fun setup() {
        repo = Mockito.mock(IFlyplassRepo::class.java)
        config = Mockito.mock(CacheConfig::class.java)
        service = FlyplassService(repo!!, config!!)
    }

    @Test
    fun testGetFlyplasser() {
        service!!.getAllFlyplass()
        Mockito.verify(repo, Mockito.times(1))!!.findAll()
    }

    @Test
    fun testGetFlyplassCacheOk() {
        Mockito.`when`(repo!!.findById("TEST")).thenReturn(
            Optional.of(
                Flyplass("test", "test", "test","test", "", "", "")))

        service!!.getFlyplassCache("test")

        Mockito.verify(repo, Mockito.times(1))!!.findById("TEST")
    }

    @Test
    fun testGetFlyplassCacheNotOk() {
        Mockito.`when`(repo!!.findById("TEST")).thenReturn(
            Optional.empty())

        assertThrows<AirportNotFoundException> {
            service!!.getFlyplassCache("test")
        }

        Mockito.verify(repo, Mockito.times(1))!!.findById("TEST")
    }

    @Test
    fun testGetFlyplassDefaultOk() {
        Mockito.`when`(repo!!.findById("TEST")).thenReturn(
            Optional.of(
                Flyplass("test", "test", "test","test", "", "", "")))

        service!!.getFlyplassDefault("test")

        Mockito.verify(repo, Mockito.times(1))!!.findById("TEST")
    }

    @Test
    fun testGetFlyplassDefaultNotOk() {
        Mockito.`when`(repo!!.findById("TEST")).thenReturn(
            Optional.empty())

        assertThrows<AirportNotFoundException> {
            service!!.getFlyplassDefault("test")
        }

        Mockito.verify(repo, Mockito.times(1))!!.findById("TEST")
    }

    @Test
    fun testGetFlyplassOk() {

        val serviceSpy = Mockito.spy(service!!)

        Mockito.`when`(repo!!.findById("TEST")).thenReturn(
            Optional.of(
                Flyplass("test", "test", "test","test", "", "", "")))

        serviceSpy.getFlyplass("test")

        Mockito.verify(serviceSpy, Mockito.times(1))!!.getFlyplassCache("test")
    }

    @Test
    fun testGetFlyplassNotOk() {

        val serviceSpy = Mockito.spy(service!!)

        Mockito.`when`(repo!!.findById("TEST")).thenReturn(
            Optional.of(
                Flyplass("test", "test", "test","test", "", "", "")))

        Mockito.`when`(serviceSpy!!.getFlyplassCache("test")).thenThrow(QueryTimeoutException::class.java)


        try {
            serviceSpy.getFlyplass("test")
        } catch (e: Exception) {
            println(e.message)
        }

        Mockito.verify(serviceSpy, Mockito.times(1))!!.getFlyplassDefault("test")
    }

    @Test
    fun testUpdateFlyplassOk() {
        val flyplass = Flyplass("test", "test", "test","test", "", "", "")
        Mockito.`when`(repo!!.save(flyplass)).thenReturn(flyplass)
        Mockito.`when`(repo!!.findById("TEST")).thenReturn(Optional.of(flyplass))

        service!!.updateFlyplass("test", flyplass)

        Mockito.verify(repo, Mockito.times(1))!!.findById("TEST")
        Mockito.verify(repo, Mockito.times(1))!!.save(flyplass)
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("flyplass", "test")
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("flyplass", "all")
    }

    @Test
    fun testDeleteFlyplassOk() {
        val flyplass = Flyplass("test", "test", "test","test", "", "", "")

        service!!.deleteFlyplass("test")

        Mockito.verify(repo, Mockito.times(1))!!.deleteById(flyplass.icao)
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("flyplass", "test")
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("flyplass", "all")
    }

    @Test
    fun testAddFlyplassOk() {
        val flyplass = Flyplass("test", "test", "test","test", "", "", "")

        Mockito.`when`(repo!!.save(flyplass)).thenReturn(flyplass)

        service!!.addFlyplass(flyplass)

        Mockito.verify(repo, Mockito.times(1))!!.save(flyplass)
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("flyplass", "all")

    }

}
