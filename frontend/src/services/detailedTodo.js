import { readonly, ref } from 'vue'

import { client } from '@/api'

const todo = ref(undefined)

const isPending = ref(false)

const error = ref(undefined)

const fetchTodo = async (id) => {
  isPending.value = true
  todo.value = undefined
  error.value = undefined

  try {
    const response = await client.get(`/api/v1/${id}/`)

    todo.value = response.data
  } catch (err) {
    error.value = err.response?.data ?? true
  } finally {
    isPending.value = false
  }
}

const updateTodo = async (patch = {}) => {
  isPending.value = true
  error.value = undefined

  try {
    const response = await client.put(`/api/v1/${todo.value.id}/`, {
      ...todo.value,
      ...patch
    })

    todo.value = response.data
  } catch (err) {
    error.value = err.response?.data ?? true
  } finally {
    isPending.value = false
  }
}

export const useDetailedTodoService = () => ({
  todo: todo,
  isPending: readonly(isPending),
  error: readonly(error),
  fetchTodo,
  updateTodo
})
