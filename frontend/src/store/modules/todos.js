import { api } from '@/api'

export default {
  state: () => ({
    list: []
  }),
  mutations: {
    setTodosList (state, list) {
      state.list = list
    }
  },
  actions: {
    async loadTodos (context) {
      try {
        const response = await api.get('/api/v1/')

        const data = response.data

        context.commit('setTodosList', data)
      } catch (error) {
        console.log(error)
      }
    },
    async makeDone ({ dispatch }, id) {
      try {
        await api.patch(`/api/v1/${id}/`, {
          done: true
        })

        await dispatch('loadTodos')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
