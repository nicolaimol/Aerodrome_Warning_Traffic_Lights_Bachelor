package bachelor.met.awstl.service

import bachelor.met.awstl.config.CacheConfig
import bachelor.met.awstl.enum.Cache
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.mockito.Mockito
import java.util.*


@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class CacheServiceUnitTest {

    var service: CacheService? = null
    var config: CacheConfig? = null

    @BeforeEach
    fun setUp() {
        config = Mockito.mock(CacheConfig::class.java)
        service = CacheService(config!!)
    }


    // location forecast
    @Test
    fun testCheckCacheNoLocfor() {

        service!!.chechCache("test", Cache.LOCFOR)
        Mockito.verify(config, Mockito.times(0))!!
            .removeByNameAndId("locfor", "test")


    }

    @Test
    fun testCheckCacheLocforOld() {

        service!!.setTimeInCache("Thu, 19 May 2022 06:33:37 GMT", "test", Cache.LOCFOR)

        service!!.chechCache("test", Cache.LOCFOR)
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("locfor", "TEST")

    }

    @Test
    fun testCheckCacheLocforNew() {

        service!!.setTimeInCache("Thu, 19 May 9999 06:33:37 GMT", "test", Cache.LOCFOR)

        service!!.chechCache("test", Cache.LOCFOR)
        Mockito.verify(config, Mockito.times(0))!!
            .removeByNameAndId("locfor", "TEST")

    }

    @Test
    fun testGetTimeByIcaoType() {

        service!!.setTimeInCache("Thu, 19 May 2022 06:33:37 GMT", "test", Cache.LOCFOR)

        val time = service!!.getTimeByIcaoType("test", Cache.LOCFOR)
        assertThat(time).isEqualTo(Date("Thu, 19 May 2022 06:33:37 GMT"))

    }

    // nowcast
    @Test
    fun testCheckCacheNoNowcast() {

        service!!.chechCache("test", Cache.NOWCAST)
        Mockito.verify(config, Mockito.times(0))!!
            .removeByNameAndId("nowcast", "test")

    }

    @Test
    fun testCheckCacheNowcastOld() {

        service!!.setTimeInCache("Thu, 19 May 2022 06:33:37 GMT", "test", Cache.NOWCAST)

        service!!.chechCache("test", Cache.NOWCAST)
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("nowcast", "TEST")

    }

    @Test
    fun testCheckCacheNowcastNew() {

        service!!.setTimeInCache("Thu, 19 May 9999 06:33:37 GMT", "test", Cache.NOWCAST)

        service!!.chechCache("test", Cache.NOWCAST)
        Mockito.verify(config, Mockito.times(0))!!
            .removeByNameAndId("nowcast", "TEST")

    }

    @Test
    fun testGetTimeByIcaoTypeNowcast() {

        service!!.setTimeInCache("Thu, 19 May 2022 06:33:37 GMT", "test", Cache.NOWCAST)

        val time = service!!.getTimeByIcaoType("test", Cache.NOWCAST)
        assertThat(time).isEqualTo(Date("Thu, 19 May 2022 06:33:37 GMT"))

    }

    // taf metar
    @Test
    fun testCheckNoTafMetar() {

        service!!.chechCache("test", Cache.TAFMETAR)
        Mockito.verify(config, Mockito.times(0))!!
            .removeByNameAndId("tafmetar", "test")

    }

    @Test
    fun testCheckTafMetarOld() {

        service!!.setTimeInCache("Thu, 19 May 2022 06:33:37 GMT", "test", Cache.TAFMETAR)

        service!!.chechCache("test", Cache.TAFMETAR)
        Mockito.verify(config, Mockito.times(1))!!
            .removeByNameAndId("tafmetar", "TEST")

    }

    @Test
    fun testCheckTafMetarNew() {

        service!!.setTimeInCache("Thu, 19 May 9999 06:33:37 GMT", "test", Cache.TAFMETAR)

        service!!.chechCache("test", Cache.TAFMETAR)
        Mockito.verify(config, Mockito.times(0))!!
            .removeByNameAndId("tafmetar", "TEST")

    }

    @Test
    fun testGetTimeByIcaoTypeTafMetar() {

        service!!.setTimeInCache("Thu, 19 May 2022 06:33:37 GMT", "test", Cache.TAFMETAR)

        val time = service!!.getTimeByIcaoType("test", Cache.TAFMETAR)
        assertThat(time).isEqualTo(Date("Thu, 19 May 2022 06:33:37 GMT"))

    }


}
