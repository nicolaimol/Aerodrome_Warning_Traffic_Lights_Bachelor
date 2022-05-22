package bachelor.met.awstl.dto

import bachelor.met.awstl.model.Rullebane
import java.io.Serializable

class FlyplassDto(var navn: String?, var icao: String?, var rwy: Array<Rullebane>?): Serializable {

}
