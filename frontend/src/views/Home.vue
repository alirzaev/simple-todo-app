<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-sm-12 mb-3">
      <draggable class="todos" v-model="todos" item-key="id">
        <template #item="{element}">
          <TodoListItem :key="element.id" :id="element.id" :title="element.title" :done="element.done"/>
        </template>
      </draggable>
      <AddTodo/>
      <router-link :to="{ name: 'DoneTodos' }">Завершенные</router-link>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import AddTodo from '@/components/AddTodo'
import TodoListItem from '@/components/TodoListItem'

export default {
  name: 'Home',
  components: {
    AddTodo,
    TodoListItem,
    draggable
  },
  created () {
    this.$store.dispatch('todos/load')
  },
  computed: {
    todos: {
      get () {
        return this.$store.state.todos.todos
      },
      set (value) {
        this.$store.dispatch('todos/updateRanks', value)
      }
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
