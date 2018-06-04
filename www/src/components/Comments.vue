<template>
  <div class="comments">
    <ol>
      <li v-for="comment in list">
        <p>{{comment.body}}</p>
        <button @click="deleteComment(comment)">Delete Comment</button>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'Tasks',
    data() {
      return {

      }
    },
    props: {
      list: {
        type: Array,
        required: true
      }
    },
    computed: {},
    methods: {
      deleteComment(comment) {
        this.$store.dispatch('deleteComment', comment)
      }
    }
  }
</script>

<style>
</style>