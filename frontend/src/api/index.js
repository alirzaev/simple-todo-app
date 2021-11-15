import axios from 'axios'
import store from '@/store'

export const api = axios.create({
  baseURL: 'http://localhost:8000/'
})

api.interceptors.request.use((config) => {
  const token = store.state.auth.token

  if (!config.url.endsWith('auth/login/')) {
    config.headers.Authorization = `Token ${token}`
  }

  return config
})
