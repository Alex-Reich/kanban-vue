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
            <div v-for="list in lists[board._id]">
                <h1>{{list.title}}</h1>
                <form @submit.prevent="createTask(list)" :key="list._id">
                    <input type="text" name="body" v-model="task.body" placeholder="Create a task">
                    <button type="submit">Add Task</button>
                </form>
                <button @click="deleteList(list)">Delete this list</button>
                <!-- <tasks :list="" button-text="Add Comment" :handle-button-click="createComment"></tasks> -->
            </div>
            {{taskList}}
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
                },
                task: {
                    body: '',
                    parentId: ''
                }
            }
        },
        mounted() {
            this.$store.dispatch('fetchLists', this.board._id),
                this.$store.dispatch('fetchTasks')
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
            },
            taskList() {
                return this.$store.state.taskList
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
            createList() {
                this.list.parentId = this.board._id
                this.$store.dispatch('createList', this.list)
                console.log(this.list)
                this.list = { title: '', parentId: '' }
            },
            deleteList(list) {
                this.$store.dispatch('deleteList', list)
            },
            createTask(list) {
                this.task.parentId = list._id

                console.log(this.task)
                this.$store.dispatch('createTask', this.task)
                this.task = { body: '', parentId: '' }
            }
        }
    }
</script>

<style>
</style>