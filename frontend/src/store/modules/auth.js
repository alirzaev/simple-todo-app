import axios from 'axios'

export default {
  state: () => ({
    token: undefined,
    pending: false
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
    }
  },
  actions: {
    loadToken (context) {
      const token = localStorage.getItem('token')

      if (token) {
        context.commit('setToken', token)
      }
    },
    async login (context, { username, password }) {
      try {
        context.commit('setPending', true)

        const response = await axios.post('http://localhost:8000/api/v1/auth/login/', {
          username,
          password
        })
        const data = response.data

        context.commit('setToken', data.key)

        return true
      } catch (error) {
        return false
      } finally {
        context.commit('setPending', false)
      }
    },
    logout (context) {
      context.commit('deleteToken')
    }
  }
}
