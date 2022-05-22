package bachelor.met.awstl.dto

import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Terskelverdi

class TerskelverdiDto(){

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

    var flyplass: FlyplassDto? = null

    constructor(
        terskel: Terskelverdi
    ): this() {
        this.airTempMin = terskel.airTempMin
        this.airTempMax = terskel.airTempMax
        this.airTempActive = terskel.airTempActive
        this.precipitationMin = terskel.precipitationMin
        this.precipitationMax = terskel.precipitationMax
        this.precipitationActive = terskel.precipitationActive
        this.windSpeedMin = terskel.windSpeedMin
        this.windSpeedMax = terskel.windSpeedMax
        this.windSpeedActive = terskel.windSpeedActive
        this.windGustMin = terskel.windGustMin
        this.windGustMax = terskel.windGustMax
        this.windGustActive = terskel.windGustActive
        this.probThunderMin = terskel.probThunderMin
        this.probThunderMax = terskel.probThunderMax
        this.probThunderActive = terskel.probThunderActive
        this.humidityMin = terskel.humidityMin
        this.humidityMax = terskel.humidityMax
        this.humidityActive = terskel.humidityActive
        this.crosswindMin = terskel.crosswindMin
        this.crosswindMax = terskel.crosswindMax
        this.crosswindActive = terskel.crosswindActive

        this.flyplass = FlyplassToFlyplassDto.convert(terskel.flyplass)
    }
}
