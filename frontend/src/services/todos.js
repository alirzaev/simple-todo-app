import { ref } from 'vue'

import { client } from '@/api'

const todos = ref([])

const fetchTodos = async () => {
  try {
    const response = await client.get('/api/v1/')

    todos.value = response.data
  } catch (error) {
  }
}

export const useTodosService = () => ({
  todos,
  fetchTodos
})
