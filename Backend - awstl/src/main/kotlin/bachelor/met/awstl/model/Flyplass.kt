package bachelor.met.awstl.model

import java.io.Serializable
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumns
import javax.persistence.OneToMany
import javax.persistence.OrderColumn

@Entity
class Flyplass(): Serializable {

    @Id
    var icao: String? = null

    var navn: String? = null
    var iata: String? = null
    var altitude: String? = null
    var lat: String? = null
    var lon: String? = null

    @OneToMany
    @OrderColumn
    var rwy: Array<Rullebane>? = null

    constructor(icao: String, navn: String, iata: String, altitude: String, lat: String, lon: String, rwy: Array<Rullebane>): this() {
        this.icao = icao
        this.navn = navn
        this.iata = iata
        this.altitude = altitude
        this.lat = lat
        this.lon = lon
        this.rwy = rwy
    }

    override fun toString(): String {
        return "Flyplass(icao='$icao', navn='$navn', iata=$iata, altitude='$altitude', lat='$lat', lon='$lon', rwy='$rwy')"
    }


}
