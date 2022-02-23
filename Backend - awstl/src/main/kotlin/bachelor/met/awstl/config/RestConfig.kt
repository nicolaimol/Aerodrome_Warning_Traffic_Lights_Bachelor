package bachelor.met.awstl.config

import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

/**
 * Config fto inject RestClient in project
 * Setting required header for api.met.no
 */
@Configuration
class RestConfig {

    @Bean
    fun restTemplate (builder: RestTemplateBuilder): RestTemplate {
        return builder.defaultHeader("user-agent",
            "awtl.met.no nicolaim@met.no").build()
    }
}
