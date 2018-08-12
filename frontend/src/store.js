import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    score: -1,
  },
  mutations: {
    setScore(state, score) {
      state.score = score
    }
  },
  actions: {
    getScore({commit}) {

      const eventSource = new EventSource('http://localhost:8080/score');
      eventSource.onmessage = message => {
        commit('setScore', JSON.parse(message.data));
      };
    }
  }
})