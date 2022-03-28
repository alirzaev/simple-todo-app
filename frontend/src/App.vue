<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link"><i class="bi bi-list-check me-1"></i>Задачи</router-link>
        </li>
      </ul>
      <button class="btn btn-outline-danger" v-if="isAuth" @click="onClick">Выйти</button>
      <router-link class="btn btn-outline-primary" to="/login" v-else>Войти</router-link>
    </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'

import { useAuthService } from '@/services/auth'

export default {
  setup () {
    const { token, logout } = useAuthService()
    const router = useRouter()

    const isAuth = computed(() => Boolean(token.value))

    const onClick = () => {
      logout().then(() => { router.push({ name: 'Login' }) })
    }

    return {
      isAuth,
      onClick
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
