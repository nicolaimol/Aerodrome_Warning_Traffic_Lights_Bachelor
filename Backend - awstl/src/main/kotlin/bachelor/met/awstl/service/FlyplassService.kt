package bachelor.met.awstl.service

import bachelor.met.awstl.dto.FlyplassDto
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.repo.IFlyplassRepo
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class FlyplassService(val repo: IFlyplassRepo) {

    @Cacheable(value = ["flyplass"], key = "#icao")
    fun getFlyplass(icao: String): Flyplass {

        return repo.findById(icao.uppercase()).orElseThrow { AirportNotFoundException("Airport with icao $icao not found")}

    }

    @Cacheable(value = ["flyplass"])
    fun getAllFlyplass(): List<Flyplass> {
        return repo.findAll()
    }

    @Cacheable(value = ["flyplassvalid"], key = "#icao")
    fun validateIcao(icao: String): Boolean {
        return repo.findById(icao.uppercase()).isPresent
    }

}
