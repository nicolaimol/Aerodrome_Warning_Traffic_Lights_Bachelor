package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.NowcastDto
import bachelor.met.awstl.enum.Cache
import bachelor.met.awstl.exception.AirportNotFoundException
import bachelor.met.awstl.service.CacheService
import bachelor.met.awstl.service.NowcastService
import bachelor.met.awstl.util.ExpireHeader
import org.slf4j.LoggerFactory
import org.springframework.http.CacheControl
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit


/**
 * Controller for receiving nowcast
 * enppoints
 *  /api/nowcast?icao
 *  icao is required for receiving data
 *
 * logic to get data is done in injected NowcastService
 */
@RestController
@RequestMapping(value = ["/api"])
@CrossOrigin(value = ["http://localhost:3001"])
class NowcastController(val service: NowcastService, val cacheService: CacheService, val expireHeader: ExpireHeader) {

    val logger = LoggerFactory.getLogger(NowcastController::class.java)

    @GetMapping(value = ["/nowcast"])
    fun getNowCast(@RequestParam("icao") icao: String): ResponseEntity<NowcastDto> {

        val ret = service.getNowcast(icao)

        //val formatter = SimpleDateFormat("E, dd MMM yyyy HH:mm:ss z", Locale.ENGLISH)
        //formatter.timeZone= TimeZone.getTimeZone("GMT")


        val header = expireHeader.makeHeader(icao, Cache.NOWCAST)
        //header.set(HttpHeaders.EXPIRES, formatter.format(cacheService.getTimeByIcaoType(icao, Cache.NOWCAST)))

        return ResponseEntity.ok().headers(header).cacheControl(CacheControl.empty()).body(ret)
    }



}
