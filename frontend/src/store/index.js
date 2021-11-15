import { createStore } from 'vuex'
import newTodo from './modules/newTodo'
import auth from './modules/auth'
import detailedTodo from './modules/detailedTodo'
import todos from './modules/todos'
import doneTodos from './modules/doneTodos'

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
    doneTodos,
    newTodo,
    todos
  }
})
