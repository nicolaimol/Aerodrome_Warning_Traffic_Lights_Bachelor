package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.LoginDto
import bachelor.met.awstl.dto.RegisterDto
import bachelor.met.awstl.service.KeycloakAdminClientService
import org.keycloak.representations.AccessTokenResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.constraints.NotNull
import javax.ws.rs.core.Response

@RequestMapping(value = ["/api/user"])
@RestController
class SecurityController(val service: KeycloakAdminClientService) {

    @PostMapping(value = ["/login"])
    fun login(@NotNull @RequestBody dto: LoginDto): ResponseEntity<AccessTokenResponse> {
        val response = service.login(dto)

        return ResponseEntity.ok(response)
    }

    @PostMapping(value = ["/create"])
    fun createUser(@NotNull @RequestBody dto: RegisterDto): ResponseEntity<Response> {
        val response = service.createKeycloakUser(dto)

        return ResponseEntity.status(response.status).build()

    }

    @GetMapping(value = ["/{username}"])
    fun getUserByUsername(@PathVariable username: String): ResponseEntity<Any> {
        val users = service.getUser(username)

        return ResponseEntity.ok(users)
    }

    @GetMapping
    fun getUserByUsername(): ResponseEntity<Any> {
        val users = service.getUsers()

        return ResponseEntity.ok(users)
    }

}
