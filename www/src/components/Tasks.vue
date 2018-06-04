<template>
    <div class="tasks">
        <ul>
            <li v-for="task in list">
                <p>{{task.body}}</p>
                <select v-model="selected">
                    <option disabled value="">Move to list:</option>
                    <option v-for="list in lists">{{list.title}}</option>
                </select>
                <button @click="deleteTask(task)">Delete this task</button>
                <div v-if="comments[task._id]">
                    <comments :list="comments[task._id]"></comments>
                </div>
                <form @submit.prevent="createComment(task)" :key="task._id">
                    <input type="text" name="body" v-model="comment.body" placeholder="Add a comment">
                    <button type="submit">Add Comment</button>
                </form>
            </li>
        </ul>
    </div>
</template>

<script>
    import comments from './Comments.vue'
    export default {
        name: 'Tasks',
        data() {
            return {
                comment: {
                    body: '',
                    parentId: ''
                },
                selected: ''
            }
        },
        components: {
            comments
        },
        mounted() {
            this.$store.dispatch('fetchComments')
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            lists: {
                type: Array,
                required: true
            }

        },
        computed: {
            comments() {
                return this.$store.state.comments
            }
        },
        methods: {
            deleteTask(task) {
                this.$store.dispatch('deleteTask', task)
            },
            createComment(task) {
                console.log(task)
                this.comment.parentId = task._id
                console.log(this.comment)
                this.$store.dispatch('createComment', this.comment)
                this.comment = { body: '', parentId: '' }
            }

        }
    }

</script>

<style>
</style>