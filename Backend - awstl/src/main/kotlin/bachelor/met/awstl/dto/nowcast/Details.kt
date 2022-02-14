package bachelor.met.awstl.dto.nowcast

import java.io.Serializable

class Details: Serializable {

    var air_temperature: Double = 0.0
    var precipitation_rate: Double = 0.0
    var relative_humidity: Double = 0.0
    var wind_from_direction: Double = 0.0
    var wind_speed: Double = 0.0
    var wind_speed_of_gust: Double = 0.0

}
