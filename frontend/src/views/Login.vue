<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-sm-12">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Имя пользователя</label>
          <input type="text" name="username" id="username" class="form-control" v-model="username"
                :disabled="pending" required/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input type="password" name="password" id="password" class="form-control" v-model="password"
                :disabled="pending" required/>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary" :disabled="pending">Войти</button>
        </div>
      </form>
      <template v-if="!pending && errors">
          <div class="alert alert-danger" role="alert" v-for="error in errors" :key="error">
            {{ error }}
          </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    pending () {
      return this.$store.state.auth.pending
    },
    errors () {
      const error = this.$store.state.auth.error

      if (!error) {
        return []
      } else if (typeof error === 'object' && 'non_field_errors' in error) {
        return error.non_field_errors
      } else {
        return ['Неизвестная ошибка']
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('auth/login', {
        username: this.username,
        password: this.password
      }).then(success => {
        if (success) {
          this.$router.replace({
            name: 'Home'
          })
        }
      })
    }
  }
}
</script>
