<template>
  <form @submit.prevent="addTodo">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Новая задача" v-model="task" :disabled="pending"
             maxlength="200" required>
      <button class="btn btn-outline-primary" type="submit" :disabled="pending">
        <span v-if="pending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <i v-else class="bi bi-plus"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddTodo',
  methods: {
    addTodo () {
      this.$store.dispatch('addTodo')
    }
  },
  computed: {
    ...mapState({
      pending: state => state.detailTodo.pending,
      error: state => state.detailTodo.error
    }),
    task: {
      get () {
        return this.$store.state.addTodo.task
      },
      set (value) {
        this.$store.commit('setTask', value)
      }
    }
  }
}
</script>
