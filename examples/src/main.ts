import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import awesomecron from "awesome-cron"

import kittyui from "kitty-ui"
const app = createApp(App)
app.use(awesomecron)
app.use(kittyui)
app.mount('#app')
