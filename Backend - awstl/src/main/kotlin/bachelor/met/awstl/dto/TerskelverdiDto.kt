package bachelor.met.awstl.dto

import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Terskelverdi

class TerskelverdiDto(){

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

    var flyplass: FlyplassDto? = null

    constructor(
        terskel: Terskelverdi
    ): this() {
        this.airTempMin = terskel.airTempMin
        this.airTempMax = terskel.airTempMax
        this.precipitationMin = terskel.precipitationMin
        this.precipitationMax = terskel.precipitationMax
        this.windSpeedMin = terskel.windSpeedMin
        this.windSpeedMax = terskel.windSpeedMax
        this.windGustMin = terskel.windGustMin
        this.windGustMax = terskel.windGustMax
        this.probThunderMin = terskel.probThunderMin
        this.probThunderMax = terskel.probThunderMax
        this.humidityMin = terskel.humidityMin
        this.humidityMax = terskel.humidityMax
        this.fog = terskel.fog
        this.crosswindMin = terskel.crosswindMin
        this.crosswindMax = terskel.crosswindMax

        this.flyplass = FlyplassToFlyplassDto.convert(terskel.flyplass!!)
    }
}
