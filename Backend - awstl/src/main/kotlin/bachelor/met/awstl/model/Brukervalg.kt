package bachelor.met.awstl.model

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity
class Brukervalg() {

    @Id
    lateinit var id: String

    @ManyToOne
    @JoinColumn(name = "favoritt_id")
    lateinit var favoritt: Flyplass

    var vind: Double = 0.0
    var crossvind: Double = 0.0


    constructor(id: String, favoritt: Flyplass, vind: Double, crossvind: Double) : this() {
        this.id = id
        this.favoritt = favoritt
        this.vind = vind
        this.crossvind = crossvind
    }
}
