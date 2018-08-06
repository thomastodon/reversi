<template>
  <div>
    <h2 id="title">reversi</h2>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="scss">
  @import 'main';

  body {
    background-color: $dark-gray;
  }
</style>