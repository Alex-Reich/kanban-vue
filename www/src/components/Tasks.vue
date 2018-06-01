<template>
    <div class="tasks">
        <ul>
            <li v-for="task in tasks">
                <p>{{task.body}}</p>
                <button @click="deleteTask(task)">Delete this task</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Tasks',
        data() {
            return {

            }
        },
        computed: {},
        methods: {
            deleteTask(task) {
                this.$store.dispatch('deleteTask', task)
            }
        }
    }

</script>

<style>
</style>