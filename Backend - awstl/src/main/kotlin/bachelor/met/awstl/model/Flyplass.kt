package bachelor.met.awstl.model

import javax.persistence.Entity
import javax.persistence.Id

@Entity
class Flyplass {

    @Id
    lateinit var id: String

    lateinit var navn: String
    lateinit var altitude: String
    lateinit var lat: String
    lateinit var lon: String

    lateinit var rwy: String

    constructor(id: String, navn: String, altitude: String, lat: String, lon: String, rwy: String) {
        this.id = id
        this.navn = navn
        this.altitude = altitude
        this.lat = lat
        this.lon = lon
        this.rwy = rwy
    }
}
