<template>
  <div>
    <h2 id="title">reversi</h2>
    <button id="button" v-on:click="getSomething">read</button>
    <div>{{content}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Board',
    data: function () {
      return {
        content: ''
      }
    },
    inject: ['googleCommand'],
    methods: {
      getSomething: function () {
        this.googleCommand.getFountainhead()
          .then(content => this.content = content);
      }
    }
  }
</script>
