package bachelor.met.awstl.repo

import bachelor.met.awstl.model.Terskelverdi
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ITerskelverdiRepo: JpaRepository<Terskelverdi, String> {
}
