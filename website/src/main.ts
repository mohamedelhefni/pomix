import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)


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

app.mount('#app')
