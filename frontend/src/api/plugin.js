import { client } from '@/api'
import router from '@/router'

export const VuexAxios = (store) => {
  client.interceptors.request.use((config) => {
    const token = store.state.auth.token

    if (!config.url.endsWith('auth/login/')) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  })

  client.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status === 403) {
      store.dispatch('auth/logout')

      router.push({
        name: 'Login'
      })
    }
  })
}
