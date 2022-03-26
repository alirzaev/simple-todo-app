<template>
  <div class="row justify-content-center pt-2">
    <div class="col-md-6 col-sm-12">
      <form @submit.prevent="update">
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="title" :disabled="isPending" maxlength="200" required/>
          <button class="btn btn-outline-success" type="button" :disabled="isPending" @click="toggleDone" v-if="todo">
            <span v-if="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <template v-else>
              <i v-if="!done" class="bi bi-circle"></i>
              <i v-else class="bi bi-check-circle"></i>
            </template>
          </button>
        </div>
        <div class="mb-3">
          <textarea class="form-control" v-model="body" :disabled="isPending"/>
        </div>
        <div class="mb-3 d-flex">
          <button type="submit" class="btn btn-primary ms-auto" :disabled="isPending">Обновить</button>
        </div>
      </form>
      <template v-if="!isPending && error">
        <div class="alert alert-danger" role="alert" v-if="!todo">
          Возникла ошибка при загрузке данных
        </div>
        <div class="alert alert-danger" role="alert" v-if="todo">
          Возникла ошибка при обновлении данных
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'

import { useDetailedTodoService } from '@/services/detailedTodo'

const { todo, load, spinner, isPending, error, update, toggleDone } = useDetailedTodoService()
const route = useRoute()

const done = computed(() => todo.value?.done ?? false)
const title = computed({
  get: () => todo.value?.title,
  set: (value) => {
    todo.value.title = value
  }
})
const body = computed({
  get: () => todo.value?.body,
  set: (value) => {
    todo.value.body = value
  }
})

load(route.params.id)
</script>
