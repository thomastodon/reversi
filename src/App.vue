<template>
  <div>
    <board id="board"></board>
    <fountainhead id="fountainhead"></fountainhead>
  </div>
</template>

<script>
  import Fountainhead from './components/Fountainhead.vue';
  import Board from './components/Board.vue';

  export default {
    name: 'app',
    components: {
      Board,
      Fountainhead
    },
  }
</script>

<style lang="scss">
  body {
    background-color: #aaaaaa;
  }
</style>