package bachelor.met.awstl.util

import bachelor.met.awstl.model.Flyplass

class FlyplassUpdate {

    companion object {
        fun update(flyplass: Flyplass, newFlyplass: Flyplass) {
            flyplass.navn = newFlyplass.navn
            flyplass.iata = newFlyplass.iata
            flyplass.rwy = newFlyplass.rwy
            flyplass.lat = newFlyplass.lat
            flyplass.lon = newFlyplass.lon
            flyplass.altitude = newFlyplass.altitude
        }
    }
}
