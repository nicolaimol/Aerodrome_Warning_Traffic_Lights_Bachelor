package bachelor.met.awstl.dto

import bachelor.met.awstl.dto.locationforecast.Geomerty
import bachelor.met.awstl.dto.locationforecast.Properties
import java.io.Serializable
import java.util.*

class LocationForecastDto: Serializable {
    lateinit var type: String
    lateinit var geometry: Geomerty
    lateinit var properties: Properties
}
