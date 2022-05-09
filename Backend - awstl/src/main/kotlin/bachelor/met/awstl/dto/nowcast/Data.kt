package bachelor.met.awstl.dto.nowcast

import java.io.Serializable

class Data: Serializable {

    var instant: Instant? = null
    var next_1_hours: NextOneHours? = null
}
