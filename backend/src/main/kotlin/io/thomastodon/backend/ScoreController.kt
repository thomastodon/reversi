package io.thomastodon.backend

import org.springframework.http.MediaType
import org.springframework.http.MediaType.TEXT_EVENT_STREAM_VALUE
import org.springframework.integration.channel.MessageChannelReactiveUtils.toPublisher
import org.springframework.messaging.PollableChannel
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import reactor.core.publisher.Flux


@RestController
open class ScoreController(
    private val serverSentEventChannel: PollableChannel,
    private val sseEmitter: SseEmitter
) {

    @GetMapping("/score", produces = arrayOf(TEXT_EVENT_STREAM_VALUE))
    fun sink(): Flux<String> = Flux
        .from(toPublisher<Long>(serverSentEventChannel))
        .map { it.payload.toString() }

    @GetMapping("/sse", produces = arrayOf(TEXT_EVENT_STREAM_VALUE))
    fun getSseEmitter(): SseEmitter {
        return sseEmitter
    }

    @GetMapping("/simple", produces = arrayOf(MediaType.APPLICATION_JSON_UTF8_VALUE))
    fun simple(): Flux<Map<String, Int>> = Flux
        .range(0, 3)
        .map({ anInt -> mapOf("number" to anInt) })
}
