package bachelor.met.awstl

import org.slf4j.LoggerFactory
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.cache.annotation.EnableCaching
import org.springframework.stereotype.Component
import java.io.File
import java.util.*

@SpringBootApplication
@EnableCaching
class AwstlApplication: SpringBootServletInitializer() {

	override fun configure(application: SpringApplicationBuilder): SpringApplicationBuilder {
		return application.sources(AwstlApplication::class.java)
	}

}

fun main(args: Array<String>) {
	SpringApplication.run(AwstlApplication::class.java, *args)
}




