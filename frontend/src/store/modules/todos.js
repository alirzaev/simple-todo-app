import { client } from '@/api'

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
        const response = await client.get('/api/v1/')

        const data = response.data

        context.commit('setTodos', data)
      } catch (error) {
        console.log(error)
      }
    },
    async makeDone ({ dispatch }, id) {
      try {
        await client.patch(`/api/v1/${id}/`, {
          done: true
        })

        await dispatch('load')
      } catch (error) {
        console.log(error)
      }
    },
    async update (context, todo) {
      const response = await client.put(`/api/v1/${todo.id}/`, {
        ...todo
      })

      return response.data
    }
  }
}
