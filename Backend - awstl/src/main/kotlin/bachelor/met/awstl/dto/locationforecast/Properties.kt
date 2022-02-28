package bachelor.met.awstl.dto.locationforecast

import java.io.Serializable

class Properties: Serializable {
    var meta: Meta? = null
    var timeseries: Array<Timeseries>? = null
}
