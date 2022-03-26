import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Todo from '@/views/Todo.vue'
import DoneTodos from '@/views/DoneTodos.vue'
import { useAuthService } from '@/services/auth'

const { token } = useAuthService()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/todo/:id',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/done',
    name: 'DoneTodos',
    component: DoneTodos
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = Boolean(token.value)

  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
