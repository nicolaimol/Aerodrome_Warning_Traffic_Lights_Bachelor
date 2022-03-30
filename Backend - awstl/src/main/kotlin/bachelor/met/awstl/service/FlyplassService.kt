package bachelor.met.awstl.service

import bachelor.met.awstl.config.CacheConfig
import bachelor.met.awstl.dto.FlyplassDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.repo.IFlyplassRepo
import bachelor.met.awstl.util.FlyplassUpdate
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class FlyplassService(val repo: IFlyplassRepo, val cacheConfig: CacheConfig) {

    @Cacheable(value = ["flyplass"], key = "#icao")
    fun getFlyplass(icao: String): Flyplass {

        return repo.findById(icao.uppercase()).orElseThrow { AirportNotFoundException("Airport with icao $icao not found")}

    }

    @Cacheable(value = ["flyplass"], key = "'all'")
    fun getAllFlyplass(): List<Flyplass> {
        return repo.findAll()
    }

    @Cacheable(value = ["flyplassvalid"], key = "#icao")
    fun validateIcao(icao: String): Boolean {
        return repo.findById(icao.uppercase()).isPresent
    }

    fun updateFlyplass(icao: String, newFlyplass: Flyplass) {
        val flyplass = getFlyplass(icao)

        FlyplassUpdate.update(flyplass, newFlyplass)
        repo.save(flyplass)

        cacheConfig.removeByNameAndId("flyplass", icao)
        cacheConfig.removeByNameAndId("flyplass", "all")

    }

}
