package bachelor.met.awstl.repo

import bachelor.met.awstl.model.Brukervalg
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IBrukervalgRepo : JpaRepository<Brukervalg, String> {
}
