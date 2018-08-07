package io.thomastodon.backend

import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.concurrent.ConcurrentTaskExecutor
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
open class WebConfiguration : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
    }

    override fun configureAsyncSupport(configurer: AsyncSupportConfigurer) {
        configurer.setTaskExecutor(ConcurrentTaskExecutor())
        super.configureAsyncSupport(configurer)
    }
}