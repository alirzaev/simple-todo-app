<template>
  <form @submit.prevent="add">
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

<script setup>
import { computed } from '@vue/reactivity'

import { useNewTodoService } from '@/services/newTodo'

const newTodoService = useNewTodoService()

const { add, isPending } = newTodoService
const task = computed({
  get: () => newTodoService.task.value,
  set: (value) => {
    newTodoService.task.value = value
  }
})
</script>
