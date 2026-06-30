import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistence from 'pinia-plugin-persistedstate'
import router from "@/router.js";

const pinia = createPinia();
pinia.use(piniaPluginPersistence);

createApp(App).use(pinia).use(router).mount('#app');
