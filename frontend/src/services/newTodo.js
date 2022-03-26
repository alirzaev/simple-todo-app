import { readonly, ref } from 'vue'

import { client } from '@/api'
import { useTodosService } from './todos'

const { load } = useTodosService()

const task = ref('')

const isPending = ref(false)

const error = ref(undefined)

const add = async () => {
  try {
    isPending.value = true
    error.value = undefined

    await client.post('/api/v1/', {
      title: task.value
    })

    task.value = ''
    await load()
  } catch (err) {
    error.value = err.response?.data ?? true
  } finally {
    isPending.value = false
  }
}

export const useNewTodoService = () => ({
  task,
  isPending: readonly(isPending),
  error: readonly(error),
  add
})
