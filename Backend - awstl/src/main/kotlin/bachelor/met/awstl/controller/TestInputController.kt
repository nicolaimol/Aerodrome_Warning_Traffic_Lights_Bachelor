package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.InputReadDto
import bachelor.met.awstl.model.Input
import bachelor.met.awstl.repo.IInputRepo
import org.mindrot.jbcrypt.BCrypt
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.Duration
import java.util.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping(value = ["/api/input"])
@CrossOrigin(value = ["http://localhost:3000"])
class TestInputController (val inputRepo: IInputRepo)  {

    val logger = LoggerFactory.getLogger(TestInputController::class.java)

    @PostMapping
    fun postInput(@RequestBody input: InputReadDto, @CookieValue("terskel", defaultValue = "") hash: String, response: HttpServletResponse): ResponseEntity<Any> {

        val res = if (hash == "" ) {
            val random = UUID.randomUUID();

            val salt = BCrypt.gensalt()
            BCrypt.hashpw(random.toString(), salt)


        } else {
            hash
        }

        val db = Input(res, input.input1, input.input2, input.input3)
        inputRepo.save(db);

        val cookie: ResponseCookie = ResponseCookie.from("terskel", res).maxAge(Duration.ofMinutes(30)).build()
        response.addCookie(Cookie("terskel", res))
        return ResponseEntity
            .ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(input)

    }

    @GetMapping
    fun getValg(@CookieValue(name = "terskel", defaultValue =  "") hash: String): ResponseEntity<Any> {

        if (hash == "") {
            logger.error("NO HASH FOUND")
            return ResponseEntity.notFound().build()
        }
        try {
            val valg = inputRepo.findById(hash)

            if (valg.isEmpty) {
                logger.error("REMOVING COOKIE")
                val cookie: ResponseCookie = ResponseCookie.from("terskel", "").maxAge(Duration.ofMinutes(0)).build()
                return ResponseEntity.badRequest().header(HttpHeaders.SET_COOKIE, cookie.toString()).build()
            }

            val ret = InputReadDto()
            ret.input1 = valg.get().input1
            ret.input2 = valg.get().input2
            ret.input3 = valg.get().input3

            return ResponseEntity.ok(ret)
        } catch (e: Exception) {
            logger.error("ERROR FOUND ${e.message}")
            val cookie: ResponseCookie = ResponseCookie.from("terskel", "").maxAge(Duration.ofMinutes(0)).build()
            return ResponseEntity.badRequest().header(HttpHeaders.SET_COOKIE, cookie.toString()).build()
        }



    }

    @GetMapping(value = ["/all"])
    fun getAll(): ResponseEntity<Any> {

        return ResponseEntity.ok(inputRepo.findAll())
    }


}
