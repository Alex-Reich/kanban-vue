<template>
    <div class="Board">
        <button @click="pageHome">Back to home</button>
        <h1>{{board.title}}</h1>
        <!-- <div v-for="list in lists"> -->
        <!-- </div> -->
    </div>

</template>

<script>
    import router from './router'
    export default {
        name: 'Board',
        data() {
            return {

            }
        },
        computed: {},
        methods: {
            pageHome(){
                router.push({name: 'Home'})
            }
        }
    }

</script>

<style>
</style>