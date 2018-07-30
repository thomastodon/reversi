<template>
  <div class="board">
    <table>
      <tr v-for="row in 8">
        <th v-for="column in 8"></th>
      </tr>
    </table>
    <br>
    <fountainhead id="fountainhead"></fountainhead>
    <br>
    <button id="end-game" v-on:click="click">end game</button>
  </div>
</template>

<script>
  import Fountainhead from './Fountainhead.vue';

  export default {
    name: 'Board',
    components: {
      Fountainhead
    },
    methods: {
      click() {
        this.$router.push({path: '/game_over'})
      }
    }
  }
</script>

<style lang="scss">
  @import '../main';

  table {
    border-collapse: collapse;
    background-color: $felt-green;
    height: 400px;
    width: 400px;
  }

  tr th {
    border: 3px solid white;
  }

</style>