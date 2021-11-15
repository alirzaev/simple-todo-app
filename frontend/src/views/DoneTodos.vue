<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-sm-12">
      <h1 class="header">Завершенные</h1>
      <div class="todos">
        <TodoListItem v-for="todo in todos" v-bind:key="todo.id" :id="todo.id" :title="todo.title" :done="todo.done"/>
      </div>
    </div>
  </div>
</template>

<script>
import TodoListItem from '@/components/TodoListItem'

export default {
  name: 'DoneTodos',
  components: {
    TodoListItem
  },
  created () {
    this.$store.dispatch('doneTodos/load')
  },
  computed: {
    todos () {
      return this.$store.state.doneTodos.todos
    }
  }
}
</script>

<style lang="scss">
.todos {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 20px;
  margin: 20px 0;
}
</style>

<style lang="scss" scoped>
.header {
  font-size: 1.5rem;
  margin: 20px 0 0.5rem 0;
}
</style>
