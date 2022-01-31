package bachelor.met.awstl.dto.locationforecast

import java.io.Serializable

class Meta: Serializable {
    lateinit var updated_at: String
    lateinit var units: HashMap<String, String>
}
