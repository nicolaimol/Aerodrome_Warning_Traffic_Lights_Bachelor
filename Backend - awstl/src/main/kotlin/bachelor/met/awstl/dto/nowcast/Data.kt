package bachelor.met.awstl.dto.nowcast

import java.io.Serializable

class Data: Serializable {

    lateinit var instant: Instant
    lateinit var next_1_hours: NextOneHours
}
