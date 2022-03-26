import { readonly, ref } from 'vue'

import { client } from '@/api'
import { useTodosService } from '@/services/todos'

const { update: updateTodo } = useTodosService()

const todo = ref(undefined)

const isPending = ref(false)

const error = ref(undefined)

const spinner = ref(false)

const load = async (id) => {
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

const update = async (patch = {}) => {
  isPending.value = true
  error.value = undefined

  try {
    const data = await updateTodo({
      ...todo.value,
      ...patch
    })

    todo.value = data
  } catch (err) {
    error.value = err.response?.data ?? true
  } finally {
    isPending.value = false
  }
}

const toggleDone = async () => {
  spinner.value = true

  await update({ done: !todo.value.done })

  spinner.value = false
}

export const useDetailedTodoService = () => ({
  todo: readonly(todo),
  isPending: readonly(isPending),
  error: readonly(error),
  spinner: readonly(spinner),
  load,
  update,
  toggleDone
})
