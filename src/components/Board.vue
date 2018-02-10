<template>
  <div>
    <h2 id="title">reversi</h2>
    <button id="button" v-on:click="getSomething">read</button>
    <div>{{content}}</div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Board',
    data: function () {
      return {
        content: ''
      }
    },
    methods: {
      getSomething: function () {

        axios
          .get('https://www.googleapis.com/books/v1/volumes?q=inauthor:ayn+intitle:fountainhead')
          .then(response => this.content = response.data.items[0].volumeInfo.description)
          .catch(error => console.log(error));
      }
    }
  }
</script>
