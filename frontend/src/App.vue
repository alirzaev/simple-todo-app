<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link"><i class="bi bi-list-check me-1"></i>Задачи</router-link>
        </li>
      </ul>
      <button class="btn btn-outline-danger" v-if="isAuth" @click="logout">Выйти</button>
      <router-link class="btn btn-outline-primary" to="/login" v-else>Войти</router-link>
    </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('auth/loadToken')
  },
  computed: {
    isAuth () {
      return Boolean(this.$store.state.auth.token)
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
        .then(() => this.$router.push({ name: 'Login' }))
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
