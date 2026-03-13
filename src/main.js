import { createApp } from 'vue'
import { router }   from './router/index.js'
import './styles/main.css'
import App from './App.vue'
import './registerSW.js'

createApp(App).use(router).mount('#app')
