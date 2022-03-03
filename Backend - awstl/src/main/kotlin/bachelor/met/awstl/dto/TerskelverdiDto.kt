package bachelor.met.awstl.dto

import bachelor.met.awstl.mapper.FlyplassToFlyplassDto
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.model.Terskelverdi

class TerskelverdiDto(){

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

    var flyplass: FlyplassDto? = null

    constructor(
        terskel: Terskelverdi
    ): this() {
        this.airTemp = terskel.airTemp
        this.precipitationAmmount = terskel.precipitationAmmount
        this.windSpeed = terskel.windSpeed
        this.windDirection = terskel.windDirection
        this.windGust = terskel.windGust
        this.probThunder = terskel.probThunder
        this.dewpoint = terskel.dewpoint
        this.humidity = terskel.humidity
        this.fog = terskel.fog
        this.probIce = terskel.probIce
        this.crosswind = terskel.crosswind
        this.flyplass = FlyplassToFlyplassDto.convert(terskel.flyplass!!)
    }
}
