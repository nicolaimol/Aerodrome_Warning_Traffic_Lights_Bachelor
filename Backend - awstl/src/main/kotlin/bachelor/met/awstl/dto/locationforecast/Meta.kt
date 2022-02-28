package bachelor.met.awstl.dto.locationforecast

import java.io.Serializable

class Meta: Serializable {
    var updated_at: String? = null
    var units: HashMap<String, String>? = null
}
