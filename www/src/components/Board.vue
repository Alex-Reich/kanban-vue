<template>
    <div class="Board">
        <button @click="logout" v-if="user">Logout</button>
        <button @click="pageHome">Back to home</button>
        <hr>
        <h1>{{board.title}}</h1>
        <form @submit.prevent="createList">
            <input type="text" name="title" v-model="list.title" placeholder="Title goes here">
            <button type="submit">Add list</button>
        </form>
        <div v-for="list in lists">
        <h1>{{list.title}}</h1>
        <button @click="deleteList(list)">Delete this list</button>
        </div>
    </div>

</template>

<script>
    import router from '../router'
    export default {
        name: 'Board',
        data() {
            return {
                list: {
                    title: '',
                    parentId: ''
                }
            }
        },
        mounted(){
            this.$store.dispatch('fetchLists', this.board._id)
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            board() {
                return this.$store.state.board
            },
            lists() {
                return this.$store.state.lists
            }
        },
        methods: {
            pageHome() {
                router.push({ name: 'Home' })
                
            },

            logout() {
                this.$store.dispatch('logout')
                router.push({ name: 'Login' })
            },
            createList(){
                this.list.parentId = this.board._id
                this.$store.dispatch('createList', this.list)
                console.log(this.list)
            },
            deleteList(list){
                this.$store.dispatch('deleteList', list)
            }
        }
    }
</script>

<style>
</style>