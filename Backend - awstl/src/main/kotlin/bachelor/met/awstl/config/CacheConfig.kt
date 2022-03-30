package bachelor.met.awstl.config

import org.springframework.cache.CacheManager
import org.springframework.context.annotation.Configuration

@Configuration
class CacheConfig(private val cacheManager: CacheManager) {

    fun removeByNameAndId(name: String, key: String) {
        cacheManager.getCache(name)!!.evict(key)
    }

    fun removeByName(name: String) {
        cacheManager.getCache(name)!!.clear()
    }
}
