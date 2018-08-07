package io.thomastodon.backend

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.messaging.PollableChannel
import org.springframework.messaging.support.GenericMessage
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.reactive.server.returnResult
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.asyncDispatch
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter

@SpringBootTest
@ExtendWith(SpringExtension::class)
class BackendApplicationTests {

	private lateinit var mockMvc: MockMvc
	private lateinit var webTestClient: WebTestClient

	@Autowired private lateinit var sseEmitter: SseEmitter
	@Autowired private lateinit var context: WebApplicationContext
	@Autowired private lateinit var serverSentEventChannel: PollableChannel

	@BeforeEach
	fun setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build()
	}


	@Test
	@Disabled("hangs. The flux needs to somehow complete")
	fun `get, with MockMvc`() {

		serverSentEventChannel.send(GenericMessage(34))

		val result = mockMvc.perform(get("/score")
			.contentType(MediaType.TEXT_EVENT_STREAM))
			.andExpect(request().asyncStarted())
			.andReturn()

		mockMvc.perform(asyncDispatch(result))
			.andDo(print())
			.andExpect(content().contentType(MediaType.TEXT_EVENT_STREAM))
			.andExpect(status().isOk)
			.andExpect(content().string("34"))
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
    @Disabled("I think this will only work if using the webHandler API in our app")
	fun `get simple, with WebTestClient`() {

		webTestClient = WebTestClient.bindToApplicationContext(context).build()

		serverSentEventChannel.send(GenericMessage(34))

		val publisher = webTestClient.get()
			.uri("/score")
			.exchange()
			.returnResult<String>()
			.responseBody

		assertThat(publisher.next().block()).isEqualTo(40)
	}
}
