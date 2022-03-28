<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-sm-12">
      <h1 class="header">Завершенные</h1>
      <div class="todos">
        <TodoListItem v-for="todo in todos" v-bind:key="todo.id" :id="todo.id" :title="todo.title" :done="todo.done" @toggle="toggleDone(todo)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'

import TodoListItem from '@/components/TodoListItem'
import { useDoneTodosService } from '@/services/doneTodos'
import { patchTodo } from '@/utils/funcs'

export default {
  components: {
    TodoListItem
  },
  setup () {
    const { todos, fetchTodos } = useDoneTodosService()

    const toggleDone = async (todo) => {
      patchTodo(todo.id, {
        done: !todo.done
      })
        .then(() => fetchTodos())
    }

    onMounted(() => fetchTodos())

    return {
      todos,
      toggleDone
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
