package bachelor.met.awstl.dto

import bachelor.met.awstl.dto.locationforecast.Geomerty
import bachelor.met.awstl.dto.locationforecast.Properties
import java.io.Serializable
import java.util.*

class LocationForecastDto: Serializable {
    var type: String? = null
    var geometry: Geomerty ? = null
    var properties: Properties ? = null


}
