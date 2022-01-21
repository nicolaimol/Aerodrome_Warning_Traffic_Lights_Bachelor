package bachelor.met.awstl.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api")
class TestController {

    @GetMapping("hei")
    @CrossOrigin(origins = ["http://localhost:8080", "http://localhost:3000"])
    fun getHei(): ResponseEntity<Any> {
        return ResponseEntity.ok("Hei fra backend")
    }
}
