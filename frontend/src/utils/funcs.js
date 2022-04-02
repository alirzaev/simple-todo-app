import router from '@/router'
import { client } from '@/api'
import { useAuthService } from '@/services/auth'
import { useProgressBarService } from '@/services/progress'

const { token, logout } = useAuthService()
const { show, hide } = useProgressBarService()

export function setupAxiosInterceptors (axiosClient) {
  axiosClient.interceptors.request.use((config) => {
    if (!config.url.endsWith('auth/login/')) {
      config.headers.Authorization = `Token ${token.value}`
    }

    return config
  })
  axiosClient.interceptors.request.use((config) => {
    show()

    return config
  })

  axiosClient.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status === 403) {
      logout()

      router.push({
        name: 'Login'
      })
    }
  })
  axiosClient.interceptors.response.use((response) => {
    hide()

    return response
  }, () => {
    hide()
  })
}

export function patchTodo (id, patch) {
  return client.patch(`/api/v1/${id}/`, patch)
}

export function createTodo (title) {
  return client.post('/api/v1/', {
    title
  })
}

export function updateRanks (todos) {
  const max = Math.max(...todos.map(({ id, rank }) => rank || id))

  const data = todos.map((todo, index) => ({
    id: todo.id,
    rank: max - index
  }))

  return client.put('/api/v1/rank/', data).then(() => true).catch(() => false)
}
