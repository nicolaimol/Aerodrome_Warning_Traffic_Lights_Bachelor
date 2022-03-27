package bachelor.met.awstl.controller

import bachelor.met.awstl.dto.LoginDto
import bachelor.met.awstl.dto.RegisterDto
import bachelor.met.awstl.service.KeycloakAdminClientService
import org.apache.http.HttpResponse
import org.keycloak.KeycloakSecurityContext
import org.keycloak.adapters.springsecurity.account.SimpleKeycloakAccount
import org.keycloak.representations.AccessTokenResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.toMono
import javax.annotation.security.RolesAllowed
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpSession
import javax.validation.constraints.NotNull
import javax.ws.rs.core.Response

@RequestMapping(value = ["/api/user"])
@RestController
class SecurityController(val service: KeycloakAdminClientService) {

    val logger: Logger = LoggerFactory.getLogger(SecurityController::class.java)

    @PostMapping(value = ["/login"])
    fun login(@NotNull @RequestBody dto: LoginDto, response: HttpServletResponse): ResponseEntity<AccessTokenResponse> {
        val responseValue = service.login(dto, response)

        return ResponseEntity.ok(responseValue)
    }

    @PostMapping(value = ["/create"])
    fun createUser(@NotNull @RequestBody dto: RegisterDto): ResponseEntity<Response> {
        val response = service.createKeycloakUser(dto)

        return ResponseEntity.status(response.status).build()

    }

    @GetMapping(value = ["/auth"])
    fun authUser(): ResponseEntity<String> {

        val map = mapOf(Pair("message", "ok"))

        val sessionObj = session!!.getAttribute("SPRING_SECURITY_CONTEXT") as SecurityContextImpl
        sessionObj.authentication
        logger.info("Controller id: ${session!!.id}")
        logger.info(session.toString())

        return ResponseEntity.ok(sessionObj.toString())
    }

    @Autowired
    val session: HttpSession? = null

    @GetMapping(value = ["/test"])
    //@RolesAllowed("admin")
    fun test() {
        logger.info("tester session variabler")

        val securityContext = session!!.getAttribute("SPRING_SECURITY_CONTEXT")
        logger.info(session!!.id)
        logger.info( securityContext?.toString())
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
