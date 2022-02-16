package bachelor.met.awstl.repo

import bachelor.met.awstl.model.Flyplass
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface IFlyplassRepo: JpaRepository<Flyplass, String> {

    @Cacheable(value = ["flyplass"], key = "#id")
    override fun findById(id: String):Optional<Flyplass>
}
