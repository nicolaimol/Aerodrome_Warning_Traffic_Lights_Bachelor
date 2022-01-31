package bachelor.met.awstl.dto.locationforecast

import java.io.Serializable

class Properties: Serializable {
    lateinit var meta: Meta
    lateinit var timeseries: Array<Timeseries>
}
