package io.thomastodon.backend

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.integration.channel.QueueChannel
import org.springframework.messaging.PollableChannel
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter
import reactor.core.scheduler.Scheduler
import reactor.core.scheduler.Schedulers

@Configuration
open class Configuration {

    @Bean
    open fun serverSentEventChannel(): PollableChannel {
        return QueueChannel()
    }

    @Bean
    open fun scheduler(): Scheduler {
        return Schedulers.immediate()
    }

    @Bean
    open fun sseEmitter(): SseEmitter {
        return SseEmitter()
    }
}