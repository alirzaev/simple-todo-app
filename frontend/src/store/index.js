import { createStore } from 'vuex'
import newTodo from './modules/newTodo'
import auth from './modules/auth'
import detailedTodo from './modules/detailedTodo'
import todos from './modules/todos'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    detailedTodo,
    newTodo,
    todos
  }
})
