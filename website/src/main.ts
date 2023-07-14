import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import { inject } from "@vercel/analytics";

import App from './App.vue'
import router from './router'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";


const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Vue3ColorPicker)

// persist pinia stores in localStorage
const piniaState = localStorage.getItem('piniaState')
if (piniaState) {
    pinia.state.value = JSON.parse(piniaState)
}

watch(
    pinia.state,
    (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state))
    },
    { deep: true }
)

inject()
app.mount('#app')
