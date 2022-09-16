import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import awesomecron from "awesome-cron"

const app = createApp(App)
app.use(awesomecron)
app.mount('#app')
