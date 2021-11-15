import { api } from '@/api'

export default {
  state: () => ({
    task: '',
    pending: false,
    error: undefined
  }),
  mutations: {
    setTask (state, task) {
      state.task = task
    },
    setPending (state, pending) {
      state.pending = pending
    },
    setError (state, error) {
      state.error = error
    }
  },
  actions: {
    async addTodo ({ commit, dispatch, state }) {
      try {
        commit('setPending', true)
        commit('setError', undefined)

        await api.post('/api/v1/', {
          title: state.task
        })

        commit('setTask', '')
        dispatch('loadTodos')
      } catch (error) {
        commit('setError', error.response?.data ?? true)
      } finally {
        commit('setPending', false)
      }
    }
  }
}
