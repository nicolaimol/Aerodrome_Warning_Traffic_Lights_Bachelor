package bachelor.met.awstl.dto.locationforecast

import java.io.Serializable

class Geomerty: Serializable {

    lateinit var type: String
    lateinit var coordinates: Array<Int>
}
