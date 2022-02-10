package bachelor.met.awstl.config

import bachelor.met.awstl.dto.LocationForecastDto
import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.redis.cache.RedisCacheConfiguration
import java.time.Duration

@Configuration
class RedisConfig {

    @Bean
    fun redisCacheManagerBuilderCustomizer() = RedisCacheManagerBuilderCustomizer { builder ->
        val configurationMap = HashMap<String, RedisCacheConfiguration>()
        configurationMap["locfor"] = RedisCacheConfiguration.defaultCacheConfig(Thread.currentThread().contextClassLoader)
            .entryTtl(Duration.ofMinutes(1))
        //configurationMap["data"] = RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofSeconds(60))
        //configurationMap["user"] = RedisCacheConfiguration.defaultCacheConfig().entryTtl(Duration.ofMinutes(30))
        builder.withInitialCacheConfigurations(configurationMap)
    }
}
