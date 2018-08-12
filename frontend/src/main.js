import Vue from 'vue'
import App from './App.vue'
import GoogleCommand from './commands/google'
import router from './router'
import store from './store'

new Vue({
  el: '#app',
  store: store,
  router: router,
  provide: {googleCommand: GoogleCommand},
  render: h => h(App),
});
