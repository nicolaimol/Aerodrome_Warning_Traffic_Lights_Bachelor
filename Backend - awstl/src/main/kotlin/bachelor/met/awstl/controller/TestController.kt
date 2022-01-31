package bachelor.met.awstl.controller

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.env.Environment
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value =["/api"])
class TestController {

    val logger: Logger = LoggerFactory.getLogger(TestController::class.java)

    @GetMapping(value = ["/hei"])
    @CrossOrigin(origins = ["http://localhost:8080", "http://localhost:3000"])
    fun getHei(): ResponseEntity<Any> {
        logger.info("Hei fra frontend")
        return ResponseEntity.ok("Hei fra backend")
    }

    @GetMapping(value = ["/env"])
    fun env():ResponseEntity<Any> {
        logger.info(env?.getProperty("print.message"))
        return ResponseEntity.ok(env?.getProperty("print.message"))
    }

    @Autowired
    var env: Environment? = null
}
