import Vue from 'vue'
import App from './App.vue'
import GoogleCommand from './commands/google'
import router from './router'

new Vue({
  el: '#app',
  router: router,
  provide: {googleCommand: GoogleCommand},
  render: h => h(App),
});
