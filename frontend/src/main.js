import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import { client } from '@/api'
import { setupAxiosInterceptors } from '@/utils/funcs'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

setupAxiosInterceptors(client)

createApp(App).use(router).mount('#app')
