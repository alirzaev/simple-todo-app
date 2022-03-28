<template>
  <form @submit.prevent="onSubmit">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Новая задача" v-model="task" :disabled="isPending"
             maxlength="200" required/>
      <button class="btn btn-outline-primary" type="submit" :disabled="isPending">
        <span v-if="isPending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i v-else class="bi bi-plus"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'

import { useTodosService } from '@/services/todos'
import { createTodo } from '@/utils/funcs'

export default {
  setup () {
    const { fetchTodos } = useTodosService()

    const task = ref('')
    const isPending = ref(false)

    const onSubmit = async () => {
      try {
        isPending.value = true

        await createTodo(task.value)

        task.value = ''

        fetchTodos()
      } catch (error) {
      } finally {
        isPending.value = false
      }
    }

    return {
      onSubmit,
      isPending,
      task
    }
  }
}
</script>
