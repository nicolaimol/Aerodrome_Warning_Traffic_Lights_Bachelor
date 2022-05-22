package bachelor.met.awstl.model

import java.io.Serializable
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Rullebane(): Serializable {

    @Id
    @GeneratedValue
    var id: Long? = null
    var rwy: String? = null

    constructor(rwy: String): this() {
        this.rwy = rwy
    }

}
