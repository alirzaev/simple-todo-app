<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-sm-12 mb-3">
      <draggable v-if="todos.length > 0" class="todos" v-model="todos" item-key="id">
        <template #item="{element}">
          <TodoListItem :key="element.id" :id="element.id" :title="element.title" :done="element.done" @toggle="toggleDone(element)"/>
        </template>
      </draggable>
      <div v-else class="todos__empty">
        <span class="text-secondary text-center">Список пуст</span>
      </div>
      <AddTodo/>
      <router-link :to="{ name: 'DoneTodos' }">Завершенные</router-link>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import draggable from 'vuedraggable'

import AddTodo from '@/components/AddTodo'
import TodoListItem from '@/components/TodoListItem'
import { useTodosService } from '@/services/todos'
import { patchTodo, updateRanks } from '@/utils/funcs'

export default {
  components: {
    AddTodo,
    TodoListItem,
    draggable
  },
  setup () {
    const { todos, fetchTodos } = useTodosService()

    const toggleDone = async (todo) => {
      patchTodo(todo.id, {
        done: !todo.done
      })
        .then(() => fetchTodos())
    }

    onMounted(() => fetchTodos())

    return {
      todos: computed({
        get: () => todos.value,
        set: (value) => {
          todos.value = value
          updateRanks(value)
        }
      }),
      toggleDone
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

.todos__empty {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
