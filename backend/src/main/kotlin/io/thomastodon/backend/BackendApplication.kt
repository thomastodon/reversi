package io.thomastodon.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication

@SpringBootApplication
open class BackendApplication

fun main(args: Array<String>) {
    SpringApplicationBuilder(BackendApplication::class.java).run(*args)
}
