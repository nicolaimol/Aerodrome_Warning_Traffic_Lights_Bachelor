package bachelor.met.awstl.service

import bachelor.met.awstl.config.CacheConfig
import bachelor.met.awstl.enum.Cache
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.HashMap

@Service
class CacheService(private val config: CacheConfig) {

    private val locfor = HashMap<String, Date>()
    private val nowcast = HashMap<String, Date>()
    private val tafmetar = HashMap<String, Date>()


    fun chechCache(icaoIn: String, type: Cache) {
        val icao = icaoIn.uppercase()
        when (type) {
            Cache.LOCFOR -> {

                val time: Date? = locfor[icao]
                if (time == null) return

                if (time.before(Date())) {
                    config.removeByNameAndId("locfor", icao)
                }
            }

            Cache.NOWCAST -> {
                val time: Date? = nowcast[icao]
                if (time == null) return

                if (time.before(Date())) {
                    config.removeByNameAndId("nowcast", icao)
                }
            }

            Cache.TAFMETAR -> {
                val time: Date? = tafmetar[icao]
                if (time == null) return

                if (time.before(Date())) {
                    config.removeByNameAndId("tafmetar", icao)
                }
            }
        }
    }

    fun setTimeInCache(time: String, icao: String, type: Cache) {
        val date = Date(time)

        when (type) {
            Cache.LOCFOR -> locfor[icao.uppercase()] = date
            Cache.NOWCAST -> nowcast[icao.uppercase()] = date
            Cache.TAFMETAR -> tafmetar[icao.uppercase()] = date
        }
    }

    fun getTimeByIcaoType(icao: String, type: Cache): Date {

        return when (type) {
            Cache.NOWCAST -> nowcast[icao.uppercase()]!!
            Cache.TAFMETAR -> tafmetar[icao.uppercase()]!!
            Cache.LOCFOR -> locfor[icao.uppercase()]!!
        }

    }
}
