package bachelor.met.awstl.repo

import bachelor.met.awstl.model.Input
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IInputRepo: JpaRepository<Input, String> {
}
