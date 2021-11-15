<template>
  <form @submit.prevent="add">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Новая задача" v-model="task" :disabled="pending"
             maxlength="200" required/>
      <button class="btn btn-outline-primary" type="submit" :disabled="pending">
        <span v-if="pending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i v-else class="bi bi-plus"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddTodo',
  methods: {
    ...mapActions('newTodo', [
      'add'
    ])
  },
  computed: {
    ...mapState({
      pending: state => state.newTodo.pending,
      error: state => state.newTodo.error
    }),
    task: {
      get () {
        return this.$store.state.newTodo.task
      },
      set (value) {
        this.$store.commit('newTodo/setTask', value)
      }
    }
  }
}
</script>
