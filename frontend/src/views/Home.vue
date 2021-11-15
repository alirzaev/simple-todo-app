<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-sm-12">
      <div class="todos">
        <TodoListItem v-for="todo in todos" v-bind:key="todo.id" :title="todo.title" :id="todo.id"/>
      </div>
      <AddTodo/>
    </div>
  </div>
</template>

<script>
import AddTodo from '@/components/AddTodo'
import TodoListItem from '@/components/TodoListItem'

export default {
  name: 'Home',
  components: {
    AddTodo,
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
  margin: 20px 0;
}
</style>
