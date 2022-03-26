import router from '@/router'
import { useAuthService } from '@/services/auth'

const { token, logout } = useAuthService()

export function setupAxiosInterceptors (axiosClient) {
  axiosClient.interceptors.request.use((config) => {
    if (!config.url.endsWith('auth/login/')) {
      config.headers.Authorization = `Token ${token.value}`
    }

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
}
