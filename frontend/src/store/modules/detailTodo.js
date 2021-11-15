import { api } from '@/api'

export default {
  state: () => ({
    todo: undefined,
    pending: false,
    error: undefined,
    spinnerVisible: false
  }),
  mutations: {
    setTodo (state, todo) {
      state.todo = todo
    },
    setTodoTitle (state, title) {
      state.todo.title = title
    },
    setTodoBody (state, body) {
      state.todo.body = body
    },
    setError (state, error) {
      state.error = error
    },
    setPending (state, pending) {
      state.pending = pending
    },
    setSpinnerVisible (state, visible) {
      state.spinnerVisible = visible
    }
  },
  actions: {
    async loadTodo ({ commit }, id) {
      commit('setPending', true)
      commit('setTodo', undefined)
      commit('setError', undefined)

      try {
        const response = await api.get(`/api/v1/${id}/`)

        const data = response.data

        commit('setTodo', data)
      } catch (error) {
        commit('setError', error.response?.data ?? true)
      } finally {
        commit('setPending', false)
      }
    },
    async updateTodo ({ commit, state }, patch = {}) {
      commit('setPending', true)
      commit('setError', undefined)

      try {
        const todo = state.todo
        const response = await api.put(`/api/v1/${todo.id}/`, {
          ...todo,
          ...patch
        })

        const data = response.data

        commit('setTodo', data)
      } catch (error) {
        commit('setError', error?.response?.data ?? true)
      } finally {
        commit('setPending', false)
      }
    },
    async toggleTodoDone ({ commit, state, dispatch }) {
      commit('setSpinnerVisible', true)

      await dispatch('updateTodo', { done: !state.todo.done })

      commit('setSpinnerVisible', false)
    }
  }
}
