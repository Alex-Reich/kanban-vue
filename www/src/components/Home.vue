<template>
  <div class="home">
    <h1>Hello {{user.username}}</h1>
    <hr>
    <div v-for="board in boards">
      <button @click="boardPage(board)">{{board.title}}</button>
    </div>
    <form @submit.prevent="createBoard">
      <input type="text" name="title" v-model="title.title">
      <button type="submit">Create new board</button>
    </form>
  </div>
</template>

<script>
  import router from '../router'
  export default {
    name: 'Home',
    data() {
      return {
        title: {
          title: ''
        }
      }
    },
    mounted() {
      if (!this.$store.state.user._id) {
        router.push({ name: 'Login' }) // this goes to a login.vue
      }
      this.$store.dispatch('fetchBoards', this.user)
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', this.title)
        this.title = ''
      },
      boardPage(board){
        router.push({name: 'Board'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>