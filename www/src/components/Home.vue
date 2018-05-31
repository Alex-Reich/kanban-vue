<template>
  <div class="home">
<button @click="logout">Logout</button>
<hr>

  </div>
</template>

<script>
  import router from '../router'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  mounted(){
    if(!this.$store.state.user._id){
      router.push({name: 'Login'}) // this goes to a login.vue
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      router.push('Login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
