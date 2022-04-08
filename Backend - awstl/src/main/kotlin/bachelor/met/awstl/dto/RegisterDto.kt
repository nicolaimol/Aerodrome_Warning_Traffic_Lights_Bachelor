package bachelor.met.awstl.dto

import java.io.Serializable

class RegisterDto: Serializable {
    var username: String? = null
    var password: String? = null
    var email: String? = null
    var firstname: String? = null
    var lastname: String? = null
}
