package bachelor.met.awstl.service

import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.repo.IFlyplassRepo
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service

@Service
class FlyplassService(val repo: IFlyplassRepo) {

    @Cacheable(value = ["flyplass"], key = "#icao")
    fun getFlyplass(icao: String): Flyplass? {

        if (icao.equals("engm", ignoreCase = true)) {
            return Flyplass("engm", "Gardermoen", "OSL", "100", "60", "10", "01/19")
        }

        val flyplass = repo.getById(icao);

        return flyplass;
    }

    @Cacheable(value = ["flyplassvalid"], key = "#icao")
    fun validateIcao(icao: String): Boolean {
        return repo.findById(icao).isPresent
    }

}
