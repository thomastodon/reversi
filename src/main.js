import Vue from 'vue'
import App from './App.vue'
import GoogleCommand from './commands/google'

new Vue({
  el: '#app',
  provide: {googleCommand: GoogleCommand},
  render: h => h(App),
});
