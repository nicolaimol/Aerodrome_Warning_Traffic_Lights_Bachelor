package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.InputReadDto
import bachelor.met.awstl.model.Input
import bachelor.met.awstl.repo.IInputRepo
import org.mindrot.jbcrypt.BCrypt
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
@RequestMapping(value = ["/api/input"])
class TestInputController (val inputRepo: IInputRepo)  {

    @PostMapping
    fun postInput(@RequestBody input: InputReadDto): ResponseEntity<Any> {

        val random = UUID.randomUUID();

        val salt = BCrypt.gensalt()
        val res = BCrypt.hashpw(random.toString(), salt)

        val db = Input(res, input.input1, input.input2, input.input3)

        inputRepo.save(db);

        var cookie: ResponseCookie = ResponseCookie.from("terskel", res).build()

        return ResponseEntity
            .ok()
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .build()

    }

    @GetMapping
    fun getValg(@CookieValue(name = "terskel", defaultValue =  "") cookie: String): ResponseEntity<Any> {

        if (cookie == "") {
            return ResponseEntity.notFound().build()
        }

        val valg = inputRepo.findById(cookie)

        val ret = InputReadDto()
        ret.input1 = valg.get().input1
        ret.input2 = valg.get().input2
        ret.input3 = valg.get().input3

        return ResponseEntity.ok(ret)
    }

    @GetMapping(value = ["/all"])
    fun getAll(): ResponseEntity<Any> {

        return ResponseEntity.ok(inputRepo.findAll())
    }


}
