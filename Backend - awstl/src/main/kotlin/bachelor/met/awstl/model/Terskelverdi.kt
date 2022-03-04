package bachelor.met.awstl.model

import bachelor.met.awstl.dto.TerskelverdiDto
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity
class Terskelverdi() {

    @Id
    lateinit var id: String

    var airTemp: Double = 0.0
    var precipitationAmmount: Double = 0.0
    var windSpeed: Double = 0.0
    var windDirection: Double = 0.0
    var windGust: Double = 0.0
    var probThunder: Double = 0.0
    var dewpoint: Double = 0.0
    var humidity: Double = 0.0
    var fog: Double = 0.0
    var probIce: Double = 0.0
    var crosswind: Double = 0.0

    @ManyToOne
    @JoinColumn(name = "flyplass_icao")
    var flyplass: Flyplass? = null

    constructor(
        id: String,
        airTemp: Double,
        precipitationAmmount: Double,
        windSpeed: Double,
        windDirection: Double,
        windGust: Double,
        probThunder: Double,
        dewpoint: Double,
        humidity: Double,
        fog: Double,
        probIce: Double,
        crosswind: Double
    ) : this() {
        this.id = id
        this.airTemp = airTemp
        this.precipitationAmmount = precipitationAmmount
        this.windSpeed = windSpeed
        this.windDirection = windDirection
        this.windGust = windGust
        this.probThunder = probThunder
        this.dewpoint = dewpoint
        this.humidity = humidity
        this.fog = fog
        this.probIce = probIce
        this.crosswind = crosswind
    }

    constructor(id: String, dto: TerskelverdiDto): this() {
        this.id = id
        this.airTemp = dto.airTemp
        this.precipitationAmmount = dto.precipitationAmmount
        this.windSpeed = dto.windSpeed
        this.windDirection = dto.windDirection
        this.windGust = dto.windGust
        this.probThunder = dto.probThunder
        this.dewpoint = dto.dewpoint
        this.humidity = dto.humidity
        this.fog = dto.fog
        this.probIce = dto.probIce
        this.crosswind = dto.crosswind
    }

    fun update(dto: TerskelverdiDto) {
        this.airTemp = dto.airTemp
        this.precipitationAmmount = dto.precipitationAmmount
        this.windSpeed = dto.windSpeed
        this.windDirection = dto.windDirection
        this.windGust = dto.windGust
        this.probThunder = dto.probThunder
        this.dewpoint = dto.dewpoint
        this.humidity = dto.humidity
        this.fog = dto.fog
        this.probIce = dto.probIce
        this.crosswind = dto.crosswind
    }
}
