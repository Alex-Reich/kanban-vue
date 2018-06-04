<template>
    <div class="Board container-fluid">
        <div class="row d-flex">
            <div class="col-12 justify-content-between">
                <button @click="logout" v-if="user">Logout</button>
                <button @click="pageHome">Back to home</button>
            </div>
            <hr>
            <div class="col-12 justify-content-center">
                <h1 class="board-title">{{board.title}}</h1>
                <form @submit.prevent="createList">
                    <input type="text" name="title" v-model="list.title" placeholder="Title goes here">
                    <button type="submit">Add list</button>
                </form>
            </div>
            <div v-for="list in lists[board._id]" class="col-3">
                <h2 class="list-title">{{list.title}}</h2>
                <form @submit.prevent="createTask(list)" :key="list._id">
                    <input type="text" name="body" v-model="task.body" placeholder="Create a task">
                    <button type="submit">Add Task</button>
                </form>
                <button @click="deleteList(list)">Delete this list</button>
                <div v-if="taskList[list._id]">
                    <tasks :list="taskList[list._id]" :lists="lists[board._id]"></tasks>
                </div>
            </div>
        
        </div>
    </div>

</template>

<script>
    import router from '../router'
    import tasks from './Tasks'
    export default {
        name: 'Board',
        components: {
            tasks
        },
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
                this.list = { title: '', parentId: '' }
            },
            deleteList(list) {
                this.$store.dispatch('deleteList', list)
            },
            createTask(list) {
                this.task.parentId = list._id
                this.$store.dispatch('createTask', this.task)
                this.task = { body: '', parentId: '' }
            }
        }
    }
</script>

<style>
    .board-title {
        text-decoration: underline double;
    }

    .list-title {
        text-decoration: underline;
    }
</style>