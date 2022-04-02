<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div v-show="progress" class="app-progress-bar"></div>
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
import { useProgressBarService } from '@/services/progress'

export default {
  setup () {
    const { token, logout } = useAuthService()
    const router = useRouter()

    const isAuth = computed(() => Boolean(token.value))

    const { progress } = useProgressBarService()

    const onClick = () => {
      logout().then(() => { router.push({ name: 'Login' }) })
    }

    return {
      progress,
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

.app-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0.25rem;
  animation-duration: 0.75s;
  animation-timing-function: linear;
  animation-name: app-progress-bar-animation;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes app-progress-bar-animation {
  from {
    background-color: rgb(0, 255, 255);
  }
  to {
    background-color: rgb(138, 43, 226);
  }
}
</style>
