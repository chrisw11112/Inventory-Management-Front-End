import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

createApp(App).use(VueCookies, { expires: '6d'}).use(store).use(router).mount('#app')
