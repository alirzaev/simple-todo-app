<template>
  <div class="todo">
    <span class="todo__title text-primary" @click="openTodo">{{ title }}</span>
    <i class="todo__icon ms-3 bi" :class="classes" @click="toggleDone(id)"></i>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

import { useTodosService } from '@/services/todos'
import { useDoneTodosService } from '@/services/doneTodos'

const { makeDone } = useTodosService()
const { makeUndone } = useDoneTodosService()
const router = useRouter()

const props = defineProps({
  id: Number,
  title: String,
  done: Boolean
})

const classes = computed(() => [props.done ? 'bi-check-circle' : 'bi-circle'])

const openTodo = () => {
  router.push({
    name: 'Todo',
    params: {
      id: props.id
    }
  })
}

const toggleDone = () => {
  if (props.done) {
    makeUndone(props.id)
  } else {
    makeDone(props.id)
  }
}
</script>

<style lang="scss" scoped>
@import "@/../node_modules/bootstrap/scss/_functions";
@import "@/../node_modules/bootstrap/scss/_variables";

.todo {
  background-color: #f8f9fa;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0.75rem 1rem;
  transition: box-shadow 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 0 0.75rem rgba(0, 0, 0, 0.25);
  }

  &__icon {
    color: $gray-600;
    transition: color 0.15s ease-in-out;

    &:hover {
      color: $primary;
    }
  }

  &__title {
    flex-grow: 1;
  }
}
</style>
