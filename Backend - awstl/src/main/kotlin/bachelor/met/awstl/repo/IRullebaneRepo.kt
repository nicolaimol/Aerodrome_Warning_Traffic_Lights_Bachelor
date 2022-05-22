package bachelor.met.awstl.repo

import bachelor.met.awstl.model.Rullebane
import org.springframework.data.jpa.repository.JpaRepository

interface IRullebaneRepo: JpaRepository<Rullebane, Long> {
}
