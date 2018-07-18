<template>
  <div>
    <table>
      <tr v-for="row in 8">
        <th v-for="column in 8"></th>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Board',
  }
</script>

<style lang="scss">
  table {
    border-collapse: collapse;
    background-color: #1b8754;
    height: 400px;
    width: 400px;
  }

  tr th {
    border: 3px solid white;
    color: black;
  }

</style>