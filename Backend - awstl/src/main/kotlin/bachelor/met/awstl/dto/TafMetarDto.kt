package bachelor.met.awstl.dto

import java.io.Serializable

class TafMetarDto(): Serializable {

    constructor(taf: String, metar: String): this() {
        this.taf = taf
        this.metar = metar
    }

    lateinit var taf: String
    lateinit var metar: String

}
