<template>
  <div class="todo">
    <span class="todo__title text-primary" @click="openTodo">{{ title }}</span>
    <i class="todo__icon ms-3 bi" :class="classes" @click="$emit('toggle')"></i>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  props: {
    id: Number,
    title: String,
    done: Boolean
  },
  emits: ['toggle'],
  setup (props) {
    const router = useRouter()

    const classes = computed(() => [props.done ? 'bi-check-circle' : 'bi-circle'])

    const openTodo = () => {
      router.push({
        name: 'Todo',
        params: {
          id: props.id
        }
      })
    }

    return {
      classes,
      openTodo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/../node_modules/bootstrap/scss/_functions";
@import "@/../node_modules/bootstrap/scss/_variables";

.todo {
  background-color: $gray-100;
  box-shadow: 0 0 0.25rem rgba($black, 0.25);
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0.75rem 1rem;
  transition: box-shadow 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 0 0 .25rem rgba($primary,.25);
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
