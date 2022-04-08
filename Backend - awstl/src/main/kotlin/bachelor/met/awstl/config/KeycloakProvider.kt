package bachelor.met.awstl.config

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder
import org.keycloak.OAuth2Constants
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver
import org.keycloak.admin.client.Keycloak
import org.keycloak.admin.client.KeycloakBuilder
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.connection.RedisConfiguration.WithPassword

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

    //private var keycloak: Keycloak? = null
    private var keycloak: Keycloak? = null

    fun getInstance(): Keycloak {

        print("$serverURL $realm $clientID $clientSecret")
        if (keycloak == null) {
            keycloak = KeycloakBuilder
                .builder()
                .realm(realm!!)
                .serverUrl(serverURL!!)
                .clientId(clientID!!)
                .clientSecret(clientSecret!!)
                .grantType(OAuth2Constants.PASSWORD)
                .build()
        }

        return keycloak!!
    }

    fun newKeycloakBuilderWithPasswordCredentials(username: String, password: String): Keycloak {
        return KeycloakBuilder.builder()
            .realm(realm!!)
            .serverUrl(serverURL!!)
            .clientId(clientID!!)
            .clientSecret(clientSecret!!)
            .grantType(OAuth2Constants.PASSWORD)
            .username(username)
            .password(password)
            .build()
    }

    fun newKeycloakBuilderWithPasswordCredentials(): Keycloak {
        return KeycloakBuilder.builder()
            .realm(realm!!)
            .serverUrl(serverURL!!)
            .clientId(clientID!!)
            .clientSecret(clientSecret!!)
            .grantType(OAuth2Constants.PASSWORD)
            .username("admin")
            .password("admin")
            .build()
    }

}
