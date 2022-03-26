import { readonly, ref } from 'vue'

import { client } from '@/api'

const todos = ref([])

const load = async () => {
  try {
    const response = await client.get('/api/v1/')

    todos.value = response.data
  } catch (error) {
    console.log(error)
  }
}

const makeDone = async (id) => {
  try {
    await client.patch(`/api/v1/${id}/`, {
      done: true
    })

    await load()
  } catch (error) {
    console.log(error)
  }
}

const update = async (todo) => {
  const response = await client.put(`/api/v1/${todo.id}/`, {
    ...todo
  })

  return response.data
}

const updateRanks = async (newTodos) => {
  todos.value = newTodos

  const max = Math.max(...newTodos.map(({ id, rank }) => rank || id))

  const data = newTodos.map((todo, index) => ({
    id: todo.id,
    rank: max - index
  }))

  try {
    await client.put('/api/v1/rank/', data)
  } catch (error) {
    console.log(error)
  }
}

export const useTodosService = () => ({
  todos: readonly(todos),
  load,
  makeDone,
  update,
  updateRanks
})
