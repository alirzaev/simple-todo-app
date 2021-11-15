import { api } from '@/api'

export default {
  namespaced: true,
  state: () => ({
    todos: []
  }),
  mutations: {
    setTodos (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    async load (context) {
      try {
        const response = await api.get('/api/v1/done/')

        const data = response.data

        context.commit('setTodos', data)
      } catch (error) {
        console.log(error)
      }
    },
    async makeUndone ({ dispatch }, id) {
      try {
        await api.patch(`/api/v1/${id}/`, {
          done: false
        })

        await dispatch('load')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
