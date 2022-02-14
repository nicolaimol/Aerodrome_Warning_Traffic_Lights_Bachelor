package bachelor.met.awstl.dto.nowcast

import java.io.Serializable

class Properties: Serializable {

    lateinit var timeseries: Array<Timeseries>
}
