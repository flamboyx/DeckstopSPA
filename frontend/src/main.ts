import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './stores'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'


const app: any = createApp(App);

app.config.devtools = true;

app.use(createPinia());
app.use(router, axios);

app.mount('#app');