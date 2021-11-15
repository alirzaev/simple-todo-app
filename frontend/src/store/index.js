import { createStore } from 'vuex'
import auth from './modules/auth'
import todos from './modules/todos'
import detailTodo from './modules/detailTodo'
import addTodo from './modules/addTodo'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    todos,
    detailTodo,
    addTodo
  }
})
