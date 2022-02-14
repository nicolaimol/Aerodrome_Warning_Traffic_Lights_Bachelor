package bachelor.met.awstl.controller

import bachelor.met.awstl.model.Brukervalg
import bachelor.met.awstl.model.Flyplass
import bachelor.met.awstl.repo.IBrukervalgRepo
import bachelor.met.awstl.repo.IFlyplassRepo
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.env.Environment
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping(value =["/api"])
class TestController {

    val logger: Logger = LoggerFactory.getLogger(TestController::class.java)

    @Autowired
    lateinit var userRepo: IBrukervalgRepo

    @Autowired
    lateinit var flyplassRepo: IFlyplassRepo

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

    @PostMapping(value = ["/usr"])
    fun add(): ResponseEntity<Any> {
        if (flyplassRepo.count() > 0) {
            return ResponseEntity.badRequest().build()
        }

        val flyplass = Flyplass("ENGM", "Gardermoen", "OSL", "100", "60", "10", "01/19")
        val ut = flyplassRepo.save(flyplass)

        var id: String

        val valg = userRepo.save(Brukervalg("test", flyplass, 10.0, 4.0))

        return ResponseEntity.ok(valg)
    }

    @GetMapping(value = ["/usr"])
    fun get(): ResponseEntity<Any> {
        return ResponseEntity.ok(userRepo.findAll())
    }

    @DeleteMapping(value = ["/usr"])
    fun del(): ResponseEntity<Any> {
        userRepo.deleteAll()

        return ResponseEntity.ok().build()
    }

    @Autowired
    var env: Environment? = null
}
