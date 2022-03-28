import { ref } from 'vue'

import { client } from '@/api'

const todos = ref([])

const fetchTodos = async () => {
  try {
    const response = await client.get('/api/v1/done/')

    todos.value = response.data
  } catch (error) {
  }
}

export const useDoneTodosService = () => ({
  todos,
  fetchTodos
})
