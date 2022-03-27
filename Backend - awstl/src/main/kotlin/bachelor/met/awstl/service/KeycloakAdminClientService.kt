package bachelor.met.awstl.service

import bachelor.met.awstl.config.KeycloakProvider
import bachelor.met.awstl.dto.LoginDto
import bachelor.met.awstl.dto.RegisterDto
import org.keycloak.KeycloakSecurityContext
import org.keycloak.admin.client.resource.UsersResource
import org.keycloak.representations.AccessTokenResponse
import org.keycloak.representations.idm.CredentialRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpCookie
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpHeaders.SET_COOKIE
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.util.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpSession
import javax.ws.rs.core.Response


@Service
class KeycloakAdminClientService(val provider: KeycloakProvider) {

    val logger: Logger = LoggerFactory.getLogger(KeycloakAdminClientService::class.java)

    @Autowired
    val session: HttpSession? = null

    @Value("\${keycloak.realm}")
    var realm: String? = null

    @Autowired
    var authenticationManager: AuthenticationManager? = null

    @Autowired
    private val request: HttpServletRequest? = null

    @Autowired
    private val http: RestTemplate? = null

    fun login(dto: LoginDto, response:HttpServletResponse): AccessTokenResponse {
        val keycloak = provider.newKeycloakBuilderWithPasswordCredentials(dto.username!!, dto.password!!)



        //logger.info(keycloak.tokenManager().accessToken.sessionState)
        //logger.info(session!!.id)

        //val set = HashSet<SimpleGrantedAuthority>()
        //set.add(SimpleGrantedAuthority("admin"))

        //val cookie = Cookie("JSESSIONID", session!!.id)

        //response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString())

        //val et = SecurityContextHolder.getContext().authentication
        //logger.info(et.toString())
        //val authentication = KeycloakAuthenticationProvider().authenticate(et)

        //session!!.setAttribute("SPRING_SECURITY_CONTEXT", authentication)

        val headers = HttpHeaders()
        headers.setBearerAuth(keycloak.tokenManager().accessTokenString)
        val cookie = HttpCookie("JSESSIONID", session!!.id)
        headers.set("Cookie", cookie.toString())
        logger.info("Service id: ${session!!.id}")

        val entity: HttpEntity<String> = HttpEntity("body", headers)

        try {
            val securityContext: String = http!!
                .exchange("http://localhost:8080/api/user/auth", HttpMethod.GET, entity ,String::class.java).body!!

            //session!!.setAttribute("SPRING_SECURITY_CONTEXT", securityContext)
        } catch (e: Exception) {
            logger.error(e.message)
        }



        return  keycloak.tokenManager().accessToken
    }

    fun getUser(userName: String?): List<UserRepresentation?>? {
        val usersResource: UsersResource = provider.getInstance().realm(realm).users()

        return usersResource.search(userName, true)
    }

    fun getUsers(): List<UserRepresentation?>? {
        return provider
            .newKeycloakBuilderWithPasswordCredentials()
            .realm(realm)
            .users()
            .list()
    }

    fun createKeycloakUser(dto: RegisterDto): Response {

        val credentialRepresentation = createPasswordCredentials(dto.password!!)

        val user = UserRepresentation()
        user.username = dto.username!!
        user.credentials = listOf(credentialRepresentation)
        user.firstName = dto.firstname
        user.lastName = dto.lastname
        user.email = dto.email
        user.isEnabled = true
        user.isEmailVerified = true

        val userResource = provider
            .newKeycloakBuilderWithPasswordCredentials()
            .realm(realm)
            .users()

        return userResource.create(user)
    }

    private fun createPasswordCredentials(password: String): CredentialRepresentation {
        val passwordRepresentation = CredentialRepresentation()
        passwordRepresentation.isTemporary = false
        passwordRepresentation.type = CredentialRepresentation.PASSWORD
        passwordRepresentation.value = password

        return passwordRepresentation
    }
}
