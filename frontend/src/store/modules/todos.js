import axios from 'axios'

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
      const token = context.rootState.auth.token

      try {
        const response = await axios.get('http://localhost:8000/api/v1/', {
          headers: {
            Authorization: `Token ${token}`
          }
        })

        const data = response.data

        context.commit('setTodosList', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
