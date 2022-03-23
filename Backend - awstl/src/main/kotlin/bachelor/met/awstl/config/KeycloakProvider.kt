package bachelor.met.awstl.config

import org.keycloak.OAuth2Constants
import org.keycloak.admin.client.Keycloak
import org.keycloak.admin.client.KeycloakBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration

@Configuration
class KeycloakProvider() {

    @Value("\${keycloak.auth-server-url}")
    var serverURL: String? = null

    @Value("\${keycloak.realm}")
    var realm: String? = null

    @Value("\${keycloak.resource}")
    var clientID: String? = null

    @Value("\${keycloak.credentials.secret}")
    var clientSecret: String? = null

    private var keycloak: Keycloak? = null

    fun getInstance(): Keycloak {
        if (keycloak == null) {
            keycloak = KeycloakBuilder
                .builder()
                .realm(realm!!)
                .serverUrl(serverURL!!)
                .clientId(clientID!!)
                .clientSecret(clientSecret!!)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .build()
        }

        return keycloak!!
    }


}
