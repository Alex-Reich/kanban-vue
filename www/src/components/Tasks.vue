<template>
    <div class="tasks">
        <ul>
            <li v-for="task in list">
                <p>{{task.body}}</p>
                <button @click="deleteTask(task)">Delete this task</button>
                <div v-if="comments[task._id]">
                    <comments :list="comments[task._id]"></comments>
                </div>
                <form @submit.prevent="handleButtonClick(task)" :key="task._id">
                    <input type="text" name="body" v-model="comment.body" placeholder="Add a comment">
                    <button type="submit">{{buttonText}}</button>
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
                }
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
            buttonText: {
                type: String,
                required: true
            },
            handleButtonClick: {
                type: Function,
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
            
        }
    }

</script>

<style>
</style>