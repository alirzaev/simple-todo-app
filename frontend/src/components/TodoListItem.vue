<template>
  <div class="todo">
      <span class="todo__title text-primary" @click="openTodo">{{ title }}</span>
      <i class="todo__icon ms-3 bi" :class="classes" @click="toggleDone(id)"></i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoListItem',
  props: {
    id: Number,
    title: String,
    done: Boolean
  },
  computed: {
    classes () {
      return [this.done ? 'bi-check-circle' : 'bi-circle']
    }
  },
  methods: {
    ...mapActions('todos', [
      'makeDone'
    ]),
    ...mapActions('doneTodos', [
      'makeUndone'
    ]),
    openTodo () {
      this.$router.push({
        name: 'Todo',
        params: {
          id: this.$props.id
        }
      })
    },
    toggleDone () {
      if (this.done) {
        this.makeUndone(this.id)
      } else {
        this.makeDone(this.id)
      }
    }
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
