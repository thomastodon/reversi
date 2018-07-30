import VueRouter from 'vue-router'
import Vue from 'vue'
import Board from './components/Board'
import GameOver from './components/GameOver'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Board},
    {path: '/game_over', component: GameOver}
  ]
});
