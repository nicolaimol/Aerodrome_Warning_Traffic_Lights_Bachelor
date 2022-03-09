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
    var precipitationMin: Double = 0.0
    var precipitationMax: Double = 0.0
    var windSpeedMin: Double = 0.0
    var windSpeedMax: Double = 0.0
    var windGustMin: Double = 0.0
    var windGustMax: Double = 0.0
    var probThunderMin: Double = 0.0
    var probThunderMax: Double = 0.0
    var humidityMin: Double = 0.0
    var humidityMax: Double = 0.0
    var fog: Double = 0.0
    var crosswindMin: Double = 0.0
    var crosswindMax: Double = 0.0

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
        precipitationMin: Double,
        precipitationMax: Double,
        windSpeedMin: Double,
        windSpeedMax: Double,
        windGustMin: Double,
        windGustMax: Double,
        probThunderMin: Double,
        probThunderMax: Double,
        humidityMin: Double,
        humidityMax: Double,
        fog: Double,
        crosswindMin: Double,
        crosswindMax: Double,
        flyplass: Flyplass?
    ): this ()
    {
        this.id = id
        this.airTempMin = airTempMin
        this.airTempMax = airTempMax
        this.precipitationMin = precipitationMin
        this.precipitationMax = precipitationMax
        this.windSpeedMin = windSpeedMin
        this.windSpeedMax = windSpeedMax
        this.windGustMin = windGustMin
        this.windGustMax = windGustMax
        this.probThunderMin = probThunderMin
        this.probThunderMax = probThunderMax
        this.humidityMin = humidityMin
        this.humidityMax = humidityMax
        this.fog = fog
        this.crosswindMin = crosswindMin
        this.crosswindMax = crosswindMax
        this.flyplass = flyplass
    }

    constructor(id: String, dto: TerskelverdiDto): this() {
        this.id = id
        this.airTempMin = dto.airTempMin
        this.airTempMax = dto.airTempMax
        this.precipitationMin = dto.precipitationMin
        this.precipitationMax = dto.precipitationMax
        this.windSpeedMin = dto.windSpeedMin
        this.windSpeedMax = dto.windSpeedMax
        this.windGustMin = dto.windGustMin
        this.windGustMax = dto.windGustMax
        this.probThunderMin = dto.probThunderMin
        this.probThunderMax = dto.probThunderMax
        this.humidityMin = dto.humidityMin
        this.humidityMax = dto.humidityMax
        this.fog = dto.fog
        this.crosswindMin = dto.crosswindMin
        this.crosswindMax = dto.crosswindMax
    }


    fun update(dto: TerskelverdiDto) {
        this.airTempMin = dto.airTempMin
        this.airTempMax = dto.airTempMax
        this.precipitationMin = dto.precipitationMin
        this.precipitationMax = dto.precipitationMax
        this.windSpeedMin = dto.windSpeedMin
        this.windSpeedMax = dto.windSpeedMax
        this.windGustMin = dto.windGustMin
        this.windGustMax = dto.windGustMax
        this.probThunderMin = dto.probThunderMin
        this.probThunderMax = dto.probThunderMax
        this.humidityMin = dto.humidityMin
        this.humidityMax = dto.humidityMax
        this.fog = dto.fog
        this.crosswindMin = dto.crosswindMin
        this.crosswindMax = dto.crosswindMax
    }
}
