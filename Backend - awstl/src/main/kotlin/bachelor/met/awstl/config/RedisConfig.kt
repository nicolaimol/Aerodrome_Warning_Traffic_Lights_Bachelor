package bachelor.met.awstl.config

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
            .entryTtl(Duration. ofHours(1))
        configurationMap["tafmetar"] = RedisCacheConfiguration.defaultCacheConfig(Thread.currentThread().contextClassLoader)
            .entryTtl(Duration.ofHours(1))
        configurationMap["flyplass"] = RedisCacheConfiguration.defaultCacheConfig(Thread.currentThread().contextClassLoader)
            .entryTtl(Duration.ofHours(24))
        configurationMap["nowcast"] = RedisCacheConfiguration.defaultCacheConfig(Thread.currentThread().contextClassLoader)
            .entryTtl(Duration.ofHours(1))
        builder.withInitialCacheConfigurations(configurationMap)
    }
}
