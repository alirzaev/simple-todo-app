<template>
  <div class="row justify-content-center">
      <form class="col-md-6 col-sm-12" @submit.prevent="login">
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
          <button type="submit" class="btn btn-primary" :disabled="pending">Войти</button>
      </form>
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
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
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
