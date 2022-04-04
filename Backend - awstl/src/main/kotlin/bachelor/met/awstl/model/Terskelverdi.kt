package bachelor.met.awstl.model

import bachelor.met.awstl.dto.TerskelverdiDto
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.sql.Timestamp
import java.time.LocalDateTime
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity
class Terskelverdi() {

    @Id
    lateinit var id: String

    var airTempMin: Double = 0.0
    var airTempMax: Double = 0.0
    var airTempActive: Boolean = true
    var precipitationMin: Double = 0.0
    var precipitationMax: Double = 0.0
    var precipitationActive: Boolean = true
    var windSpeedMin: Double = 0.0
    var windSpeedMax: Double = 0.0
    var windSpeedActive: Boolean = true
    var windGustMin: Double = 0.0
    var windGustMax: Double = 0.0
    var windGustActive: Boolean = true
    var probThunderMin: Double = 0.0
    var probThunderMax: Double = 0.0
    var probThunderActive: Boolean = true
    var humidityMin: Double = 0.0
    var humidityMax: Double = 0.0
    var humidityActive: Boolean = true
    var crosswindMin: Double = 0.0
    var crosswindMax: Double = 0.0
    var crosswindActive: Boolean = true

    @ManyToOne
    @JoinColumn(name = "flyplass_icao")
    var flyplass: Flyplass? = null

    @UpdateTimestamp
    var updateAt: LocalDateTime? = null

    @CreationTimestamp
    var createAt: LocalDateTime? = null

    constructor(
        id: String,
        airTempMin: Double,
        airTempMax: Double,
        airTempActive: Boolean,
        precipitationMin: Double,
        precipitationMax: Double,
        precipitationActive: Boolean,
        windSpeedMin: Double,
        windSpeedMax: Double,
        windSpeedActive: Boolean,
        windGustMin: Double,
        windGustMax: Double,
        windGustActive: Boolean,
        probThunderMin: Double,
        probThunderMax: Double,
        probThunderActive: Boolean,
        humidityMin: Double,
        humidityMax: Double,
        humidityActive: Boolean,
        crosswindMin: Double,
        crosswindMax: Double,
        crosswindActive: Boolean,
        flyplass: Flyplass?
    ): this ()
    {
        this.id = id
        this.airTempMin = airTempMin
        this.airTempMax = airTempMax
        this.airTempActive = airTempActive
        this.precipitationMin = precipitationMin
        this.precipitationMax = precipitationMax
        this.precipitationActive = precipitationActive
        this.windSpeedMin = windSpeedMin
        this.windSpeedMax = windSpeedMax
        this.windSpeedActive = windSpeedActive
        this.windGustMin = windGustMin
        this.windGustMax = windGustMax
        this.windGustActive = windGustActive
        this.probThunderMin = probThunderMin
        this.probThunderMax = probThunderMax
        this.probThunderActive = probThunderActive
        this.humidityMin = humidityMin
        this.humidityMax = humidityMax
        this.humidityActive = humidityActive
        this.crosswindMin = crosswindMin
        this.crosswindMax = crosswindMax
        this.crosswindActive = crosswindActive
        this.flyplass = flyplass
    }

    constructor(id: String, dto: TerskelverdiDto): this() {
        this.id = id
        this.airTempMin = dto.airTempMin
        this.airTempMax = dto.airTempMax
        this.airTempActive = dto.airTempActive
        this.precipitationMin = dto.precipitationMin
        this.precipitationMax = dto.precipitationMax
        this.precipitationActive = dto.precipitationActive
        this.windSpeedMin = dto.windSpeedMin
        this.windSpeedMax = dto.windSpeedMax
        this.windSpeedActive = dto.windSpeedActive
        this.windGustMin = dto.windGustMin
        this.windGustMax = dto.windGustMax
        this.windGustActive = dto.windGustActive
        this.probThunderMin = dto.probThunderMin
        this.probThunderMax = dto.probThunderMax
        this.probThunderActive = dto.probThunderActive
        this.humidityMin = dto.humidityMin
        this.humidityMax = dto.humidityMax
        this.humidityActive = dto.humidityActive
        this.crosswindMin = dto.crosswindMin
        this.crosswindMax = dto.crosswindMax
        this.crosswindActive = dto.crosswindActive
    }


    fun update(dto: TerskelverdiDto) {
        this.airTempMin = dto.airTempMin
        this.airTempMax = dto.airTempMax
        this.airTempActive = dto.airTempActive
        this.precipitationMin = dto.precipitationMin
        this.precipitationMax = dto.precipitationMax
        this.precipitationActive = dto.precipitationActive
        this.windSpeedMin = dto.windSpeedMin
        this.windSpeedMax = dto.windSpeedMax
        this.windSpeedActive = dto.windSpeedActive
        this.windGustMin = dto.windGustMin
        this.windGustMax = dto.windGustMax
        this.windGustActive = dto.windGustActive
        this.probThunderMin = dto.probThunderMin
        this.probThunderMax = dto.probThunderMax
        this.probThunderActive = dto.probThunderActive
        this.humidityMin = dto.humidityMin
        this.humidityMax = dto.humidityMax
        this.humidityActive = dto.humidityActive
        this.crosswindMin = dto.crosswindMin
        this.crosswindMax = dto.crosswindMax
        this.crosswindActive = dto.crosswindActive
    }
}
