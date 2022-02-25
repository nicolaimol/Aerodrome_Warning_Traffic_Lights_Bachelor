package bachelor.met.awstl.dto.locationforecast

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.io.Serializable

@JsonIgnoreProperties(ignoreUnknown = true)
class Data: Serializable {

    lateinit var instant: Instant
    var next_1_hours: NextOneHours? = null
    var next_6_hours: NextOneHours? = null
    var next_12_hours: NextOneHours? = null

}
