package bachelor.met.awstl.mapper

import bachelor.met.awstl.dto.FlyplassDto
import bachelor.met.awstl.model.Flyplass

class FlyplassToFlyplassDto {

    companion object {
        fun convert(flyplass: Flyplass?): FlyplassDto {

            return FlyplassDto(flyplass?.navn, flyplass?.icao, flyplass?.rwy)

        }
    }
}
