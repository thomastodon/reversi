package io.thomastodon.backend

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.MvcResult
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.asyncDispatch
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.setup.MockMvcBuilders

class ScoreControllerTest {

    private lateinit var scoreController: ScoreController
    private lateinit var mockMvc: MockMvc
    private lateinit var webTestClient: WebTestClient

    @BeforeEach
    fun setUp() {
        scoreController = ScoreController()

        mockMvc = MockMvcBuilders.standaloneSetup(scoreController).build()
        webTestClient = WebTestClient.bindToController(scoreController).build()
    }

    @Test
    fun `get simple, with MockMvc`() {

        val result: MvcResult = mockMvc.perform(get("/score"))
            .andExpect(request().asyncStarted())
            .andReturn()

        mockMvc
            .perform(asyncDispatch(result))
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk)
            .andExpect(content().string("[{\"number\":0},{\"number\":1},{\"number\":2}]"))
    }

    @Test
    fun `get simple, with WebTestClient`() {

        webTestClient.get()
            .uri("/score")
            .exchange()
            .expectStatus().isOk
            .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
            .expectBody().json("[{\"number\":0},{\"number\":1},{\"number\":2}]")
    }
}