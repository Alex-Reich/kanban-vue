<template>
  <div id="app">
    <h1>KANBAN VUE</h1>
    <!-- Need to fix logout button. If already logged out, button should not show -->

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: { 
    }
  }
</script>

<style>
  #app {
    font-family: 'Monoton', cursive;
  }

  .title-img {
    transform: rotate(180deg);
    height: 2rem;
  }

  .title-font {
    font-family: 'Verdana';
    height: 3rem;
  }
</style>