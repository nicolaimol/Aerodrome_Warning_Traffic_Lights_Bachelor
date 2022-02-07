package bachelor.met.awstl.repo

import bachelor.met.awstl.model.Flyplass
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IFlyplassRepo: JpaRepository<Flyplass, String> {
}
