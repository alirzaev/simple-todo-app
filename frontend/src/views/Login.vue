<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-sm-12">
      <form @submit.prevent="onLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Имя пользователя</label>
          <input type="text" name="username" id="username" class="form-control" v-model="username"
                :disabled="isPending" required/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input type="password" name="password" id="password" class="form-control" v-model="password"
                :disabled="isPending" required/>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary" :disabled="isPending">Войти</button>
        </div>
      </form>
      <template v-if="!isPending && errors">
        <div class="alert alert-danger" role="alert" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

import { useAuthService } from '@/services/auth'

const { login, isPending, error } = useAuthService()
const router = useRouter()

const username = ref('')
const password = ref('')

const errors = computed(() => {
  const err = error.value

  if (!err) {
    return []
  } else if (typeof err === 'object' && 'non_field_errors' in err) {
    return err.non_field_errors
  } else {
    return ['Неизвестная ошибка']
  }
})

const onLogin = () => {
  login({
    username: username.value,
    password: password.value
  }).then(success => {
    if (success) {
      router.replace({
        name: 'Home'
      })
    }
  })
}
</script>
