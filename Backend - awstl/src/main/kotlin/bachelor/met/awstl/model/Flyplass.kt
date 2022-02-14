package bachelor.met.awstl.model

import java.io.Serializable
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class Flyplass(): Serializable {

    @Id
    lateinit var icao: String

    lateinit var navn: String
    var iata: String? = null
    lateinit var altitude: String
    lateinit var lat: String
    lateinit var lon: String

    lateinit var rwy: String

    constructor(icao: String, navn: String, iata: String, altitude: String, lat: String, lon: String, rwy: String): this() {
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
