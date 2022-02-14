package bachelor.met.awstl.dto.nowcast

import java.io.Serializable

class Timeseries: Serializable {
    lateinit var time: String
    lateinit var data: Data
}
