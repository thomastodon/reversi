package io.thomastodon.backend

import org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
open class ScoreController {

    @GetMapping("/score", produces = arrayOf(APPLICATION_JSON_UTF8_VALUE))
    fun simple(): Flux<Map<String, Int>> = Flux
        .range(0, 3)
        .map({ anInt -> mapOf("number" to anInt) })
}
