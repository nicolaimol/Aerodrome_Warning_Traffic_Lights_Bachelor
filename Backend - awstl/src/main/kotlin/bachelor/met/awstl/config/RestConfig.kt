package bachelor.met.awstl.config

import org.apache.http.conn.ssl.SSLConnectionSocketFactory
import org.apache.http.conn.ssl.TrustStrategy
import org.apache.http.impl.client.HttpClients
import org.apache.http.ssl.SSLContexts
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
import org.springframework.web.client.RestTemplate
import java.security.cert.X509Certificate
import javax.net.ssl.SSLContext


/**
 * Config fto inject RestClient in project
 * Setting required header for api.met.no
 */
@Configuration
class RestConfig {

    @Bean
    fun restTemplate (builder: RestTemplateBuilder): RestTemplate {
        val acceptingTrustStrategy =
            TrustStrategy { chain: Array<X509Certificate?>?, authType: String? -> true }

        val sslContext: SSLContext = SSLContexts.custom()
            .loadTrustMaterial(null, acceptingTrustStrategy)
            .build()

        val csf = SSLConnectionSocketFactory(sslContext)

        val httpClient = HttpClients.custom()
            .setSSLSocketFactory(csf)
            .build()

        val requestFactory = HttpComponentsClientHttpRequestFactory()

        requestFactory.httpClient = httpClient

        /*return builder.defaultHeader("user-agent",
            "awtl.met.no nicolaim@met.no").requestFactory().build()
         */

        return RestTemplate(requestFactory).apply {
            builder.defaultHeader("user-agent",
                "awtl.met.no nicolaim@met.no") }
    }
}
