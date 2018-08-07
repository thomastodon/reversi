package io.thomastodon.backend

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.integration.channel.QueueChannel
import org.springframework.messaging.PollableChannel
import org.springframework.messaging.support.GenericMessage
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.returnResult
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.asyncDispatch
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

class ScoreControllerTest {

    private lateinit var scoreController: ScoreController
    private lateinit var mockMvc: MockMvc
    private lateinit var webTestClient: WebTestClient

    private val fakeServerSentEventChannel: PollableChannel = QueueChannel()
    private val sseEmitter: SseEmitter = SseEmitter()

    @BeforeEach
    fun setUp() {
        scoreController = ScoreController(fakeServerSentEventChannel, sseEmitter)

        mockMvc = MockMvcBuilders.standaloneSetup(scoreController).build()
        webTestClient = WebTestClient.bindToController(scoreController).build()
    }

    @Test
    fun `get score, with WebTestClient`() {

        fakeServerSentEventChannel.send(GenericMessage(26))

        val publisher = webTestClient.get()
            .uri("/score")
            .accept(MediaType.TEXT_EVENT_STREAM)
            .exchange()
            .expectStatus().isOk
            .returnResult<String>()
            .responseBody

        assertThat(publisher.next().block()).isEqualTo("26")
    }

    @Test
    @Disabled("hangs and complains about my Executor")
    fun `get score, with MockMvc`() {

        fakeServerSentEventChannel.send(GenericMessage(26))

        val result = mockMvc.perform(get("/score")
            .contentType(MediaType.TEXT_EVENT_STREAM))
            .andExpect(request().asyncStarted())
            .andReturn()

        mockMvc
            .perform(asyncDispatch(result))
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk)
            .andExpect(content().string("[{\"number\":0},{\"number\":1},{\"number\":2}]"))
    }

    @Test
    fun `get sse, with MockMvc`() {

        sseEmitter.send("26")

        val result = mockMvc.perform(get("/sse"))
            .andExpect(request().asyncStarted())
            .andReturn()

        sseEmitter.complete()

        mockMvc
            .perform(asyncDispatch(result))
            .andExpect(content().contentType("text/event-stream;charset=UTF-8"))
            .andExpect(status().isOk)
            .andExpect(content().string("data:26\n\n"))
    }

    @Test
    fun `get simple, with MockMvc`() {

        val result = mockMvc.perform(get("/simple"))
            .andExpect(request().asyncStarted())
            .andReturn()

        mockMvc
            .perform(asyncDispatch(result))
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk)
            .andExpect(content().string("[{\"number\":0},{\"number\":1},{\"number\":2}]"))
    }
}