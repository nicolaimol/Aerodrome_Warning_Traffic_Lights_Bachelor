package bachelor.met.awstl.dto.locationforecast

import java.io.Serializable

class NextOneHours: Serializable {

    lateinit var summary: Summary
    lateinit var details: HashMap<String, Double>
}
