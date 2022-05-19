package bachelor.met.awstl.service

import bachelor.met.awstl.config.CacheConfig
import bachelor.met.awstl.dto.FlyplassDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.repo.IFlyplassRepo
import bachelor.met.awstl.util.FlyplassUpdate
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.cache.annotation.Cacheable
import org.springframework.dao.QueryTimeoutException
import org.springframework.stereotype.Service

@Service
class FlyplassService(val repo: IFlyplassRepo, val cacheConfig: CacheConfig) {

    val logger: Logger = LoggerFactory.getLogger(FlyplassService::class.java)

    @Cacheable(value = ["flyplass"], key = "#icao")
    fun getFlyplassCache(icao: String): Flyplass {

        return repo.findById(icao.uppercase()).orElseThrow { AirportNotFoundException("Airport with icao $icao not found")}

    }

    fun getFlyplassDefault(icao: String): Flyplass {

        return repo.findById(icao.uppercase()).orElseThrow { AirportNotFoundException("Airport with icao $icao not found")}

    }

    fun getFlyplass(icao: String): Flyplass {
        logger.info("Getting flyplass with icao $icao")
        try {
            return getFlyplassCache(icao)
        } catch (e: QueryTimeoutException) {
            logger.error("Query timeout for $icao")
            return getFlyplassDefault(icao)
        }
    }

    @Cacheable(value = ["flyplass"], key = "'all'")
    fun getAllFlyplass(): List<Flyplass> {
        return repo.findAll()
    }

    fun updateFlyplass(icao: String, newFlyplass: Flyplass) {
        val flyplass = getFlyplass(icao)

        FlyplassUpdate.update(flyplass, newFlyplass)

        logger.info("Updating flyplass $icao")

        repo.save(flyplass)

        cacheConfig.removeByNameAndId("flyplass", icao)
        cacheConfig.removeByNameAndId("flyplass", "all")

    }

    fun addFlyplass(flyplass: Flyplass) {
        repo.save(flyplass)

        cacheConfig.removeByNameAndId("flyplass", "all")
    }

    fun deleteFlyplass(icao: String) {
        repo.deleteById(icao)

        cacheConfig.removeByNameAndId("flyplass", icao)
        cacheConfig.removeByNameAndId("flyplass", "all")
    }

}
