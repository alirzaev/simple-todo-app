import { api } from '@/api'

export default {
  namespaced: true,
  state: () => ({
    token: undefined,
    pending: false,
    error: undefined
  }),
  mutations: {
    setToken (state, token) {
      localStorage.setItem('token', token)

      state.token = token
    },
    deleteToken (state) {
      localStorage.removeItem('token')

      state.token = undefined
    },
    setPending (state, pending) {
      state.pending = pending
    },
    setError (state, error) {
      state.error = error
    }
  },
  actions: {
    loadToken ({ commit }) {
      const token = localStorage.getItem('token')

      if (token) {
        commit('setToken', token)
      }
    },
    async login ({ commit }, { username, password }) {
      try {
        commit('setPending', true)
        commit('setError', undefined)

        const response = await api.post('/api/v1/auth/login/', {
          username,
          password
        })
        const data = response.data

        commit('setToken', data.key)

        return true
      } catch (error) {
        commit('setError', error.response?.data ?? true)

        return false
      } finally {
        commit('setPending', false)
      }
    },
    logout ({ commit }) {
      commit('deleteToken')
    }
  }
}
