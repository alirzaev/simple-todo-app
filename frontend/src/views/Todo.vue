<template>
  <div class="row justify-content-center pt-2">
    <div class="col-md-6 col-sm-12">
      <form @submit.prevent="update">
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="title" :disabled="pending" maxlength="200" required/>
          <button class="btn btn-outline-success" type="button" :disabled="pending" @click="toggleDone" v-if="todo">
            <span v-if="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <template v-else>
              <i v-if="!done" class="bi bi-circle"></i>
              <i v-else class="bi bi-check-circle"></i>
            </template>
          </button>
        </div>
        <div class="mb-3">
          <textarea class="form-control" v-model="body" :disabled="pending"/>
        </div>
        <div class="mb-3 d-flex">
          <button type="submit" class="btn btn-primary ms-auto" :disabled="pending">Обновить</button>
        </div>
      </form>
      <template v-if="!pending && error">
        <div class="alert alert-danger" role="alert" v-if="!todo">
          Возникла ошибка при загрузке данных
        </div>
        <div class="alert alert-danger" role="alert" v-if="todo">
          Возникла ошибка при обновлении данных
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Todo',
  created () {
    this.$store.dispatch('loadTodo', this.$route.params.id)
  },
  methods: {
    update () {
      this.$store.dispatch('updateTodo')
    },
    toggleDone () {
      this.$store.dispatch('toggleTodoDone')
    }
  },
  computed: {
    ...mapState({
      todo: state => state.detailTodo.todo,
      done: state => state.detailTodo.todo?.done ?? false,
      spinner: state => state.detailTodo.spinnerVisible,
      pending: state => state.detailTodo.pending,
      error: state => state.detailTodo.error
    }),
    title: {
      get () {
        return this.$store.state.detailTodo.todo?.title ?? ''
      },
      set (value) {
        this.$store.commit('setTodoTitle', value)
      }
    },
    body: {
      get () {
        return this.$store.state.detailTodo.todo?.body ?? ''
      },
      set (value) {
        this.$store.commit('setTodoBody', value)
      }
    }
  }
}
</script>
