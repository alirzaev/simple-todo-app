import { readonly, ref } from 'vue'

import { client } from '@/api'

const todos = ref([])

const load = async () => {
  try {
    const response = await client.get('/api/v1/done/')

    todos.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const makeUndone = async (id) => {
  try {
    await client.patch(`/api/v1/${id}/`, {
      done: false
    })

    await load()
  } catch (error) {
    console.log(error)
  }
}

export const useDoneTodosService = () => ({
  todos: readonly(todos),
  load,
  makeUndone
})
