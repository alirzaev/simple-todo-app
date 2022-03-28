import { readonly, ref } from 'vue'

import { client } from '@/api'

const token = ref(localStorage.getItem('token') ?? undefined)

const isPending = ref(false)

const error = ref(undefined)

const login = async ({ username, password }) => {
  try {
    isPending.value = true
    error.value = undefined

    const response = await client.post('/api/v1/auth/login/', {
      username,
      password
    })
    const data = response.data

    token.value = data.key
    localStorage.setItem('token', data.key)

    return true
  } catch (err) {
    error.value = err.response?.data ?? true

    return false
  } finally {
    isPending.value = false
  }
}

const logout = async () => {
  localStorage.removeItem('token')

  token.value = undefined
}

export const useAuthService = () => ({
  token: readonly(token),
  isPending: readonly(isPending),
  error: readonly(error),
  login,
  logout
})
