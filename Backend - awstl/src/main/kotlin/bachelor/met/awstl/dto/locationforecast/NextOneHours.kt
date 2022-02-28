package bachelor.met.awstl.dto.locationforecast

import java.io.Serializable

class NextOneHours: Serializable {

    var summary: Summary? = null
    var details: HashMap<String, Double> ? = null
}
