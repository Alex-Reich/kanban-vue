import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//kanban--vue.herokuapp.com/' : '//localhost:3000/';

var api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})
var auth = axios.create({
  baseURL: baseUrl + 'auth/',
  timeout: 3000,
  withCredentials: true
})

vue.use(vuex)

function createDictionary(arr) {
  var out = {}
  for (let i = 0; i < arr.length; i++) {
    const task = arr[i];
    if (!out[task.parentId]) {
      out[task.parentId] = []
      out[task.parentId].push(task)
    }
    else {
      out[task.parentId].push(task)
    }
  }
  return out
}

export default new vuex.Store({
  state: {
    user: {},
    boards: [],
    board: {},
    lists: {},
    tasks: [],
    taskList: {},
    comments: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    deleteUser(state) {
      state.user = {}
      state.boards = []
      state.board = {}
      state.lists = {},
      state.taskList = {}
      state.comments={}
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setBoard(state, board) {
      state.board = board
    },
    setLists(state, lists) {
      state.lists = createDictionary(lists)
      console.log(state.lists)
    },
    setTaskList(state, tasks) {
      state.taskList = createDictionary(tasks)
    },
    setComments(state, comments){
      state.comments=createDictionary(comments)
    }
  },
  actions: {

    //AUTH STUFF
    login({ commit, dispatch }, loginCredentials) {
      auth.post('/login', loginCredentials)
        .then(res => {
          console.log("successfully logged in!")
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('/logout')
        .then(res => {
          console.log("Successfully logged out!")
          commit('deleteUser')
          router.push({ name: 'Login' })
        })
    },
    register({ commit, dispatch }, userData) {
      auth.post('/register', userData)
        .then(res => {
          console.log("Registration Successful")
          router.push({ name: 'Login' }) // I changed this to just change the component 
        })
    },
    authenticate({ commit, dispatch }) {
      api.get('/authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
        .catch(res => {
          console.log(res)
        })
    },
    //APP STUFF

    //////// BOARDS //////////////////////////////////
    fetchBoards({ commit, dispatch }, user) {
      api.get('/api/boards', user)
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    createBoard({ commit, dispatch, state }, title) {
      api.post('/api/boards', title)
        .then(res => {
          dispatch('fetchBoards', state.user)
        })
    },
    deleteBoard({ commit, dispatch, state }, board) {
      api.delete('/api/boards/' + board._id, board)
        .then(res => {
          dispatch('fetchBoards', state.user)
        })
    },

    ////////  LISTS //////////////////////////////////
    createList({ commit, dispatch }, list) {
      api.post('/api/lists', list)
        .then(res => {
          dispatch('fetchLists', list.parentId)
        })
    },
    fetchLists({ commit, dispatch }, boardId) {
      api.get('/api/lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },
    deleteList({ commit, dispatch }, list) {
      api.delete('/api/lists/' + list._id, list)
        .then(res => {
          dispatch('fetchLists', list.parentId)
        })
    },

    //////// TASKS //////////////////////////////////
    fetchTasks({ commit, dispatch }) {
      api.get('/api/tasks')
        .then(res => {
          commit('setTaskList', res.data)
        })
    },
    deleteTask({ commit, dispatch }, task) {
      api.delete('/api/tasks/' + task._id, task)
        .then(res => {
          dispatch('fetchTasks', task.parentId)
        })
    },
    createTask({ commit, dispatch }, task) {
      api.post('/api/tasks', task)
        .then(res => {
          dispatch('fetchTasks', task.parentId)
        })
    },
    
    //////// COMMENTS //////////////////////////////////
    fetchComments({ commit, dispatch }) {
      api.get('/api/comments')
        .then(res => {
          commit('setComments', res.data)
        })
    },
    deleteComments({ commit, dispatch }, task) {
      api.delete('/api/comments/' + task._id, task)
        .then(res => {
          dispatch('fetchComments', task.parentId)
        })
    },
    createComment({ commit, dispatch }, task) {
      api.post('/api/comments', task)
        .then(res => {
          dispatch('fetchComments', task.parentId)
        })
    }
  }
})



