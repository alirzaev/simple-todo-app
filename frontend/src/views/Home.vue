<template>
  <div class="row justify-content-center">
    <div class="todos col-md-6 col-sm-12 pt-2 pb-2">
      <TodoListItem v-for="todo in todos" v-bind:key="todo.id" :title="todo.title"/>
    </div>
  </div>
</template>

<script>
import TodoListItem from '@/components/TodoListItem'

export default {
  name: 'Home',
  components: {
    TodoListItem
  },
  created () {
    this.$store.dispatch('loadTodos')
  },
  computed: {
    todos () {
      return this.$store.state.todos.list
    }
  }
}
</script>

<style lang="scss" scoped>
.todos {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;
}
</style>
