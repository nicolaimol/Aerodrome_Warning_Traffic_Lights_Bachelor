package bachelor.met.awstl.service

import bachelor.met.awstl.config.KeycloakProvider
import bachelor.met.awstl.dto.LoginDto
import bachelor.met.awstl.dto.RegisterDto
import org.keycloak.admin.client.resource.UsersResource
import org.keycloak.representations.AccessTokenResponse
import org.keycloak.representations.idm.CredentialRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*
import javax.ws.rs.core.Response


@Service
class KeycloakAdminClientService(val provider: KeycloakProvider) {

    val logger: Logger = LoggerFactory.getLogger(KeycloakAdminClientService::class.java)

    @Value("\${keycloak.realm}")
    var realm: String? = null

    fun login(dto: LoginDto): AccessTokenResponse {
        val keycloak = provider.newKeycloakBuilderWithPasswordCredentials(dto.username!!, dto.password!!)

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
