package bachelor.met.awstl.dto

import bachelor.met.awstl.dto.nowcast.Nowcast
import java.io.Serializable

class NowcastDto: Serializable {

    var nowcasts: ArrayList<Nowcast> = ArrayList()
    var airports: ArrayList<FlyplassDto> = ArrayList()
}
