import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createBootstrap} from 'bootstrap-vue-next/plugins/createBootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import router from './router/index'
import store from './store/index'

createApp(App)
.use(createBootstrap())
.use(router)
.use(store)
.mount('#app')
