<script setup lang="ts">
import Categories from "./TheCategories.vue"
import Controls from "./TheControls.vue"
import Steps from "./TheSteps.vue"
import Timer from "./TheTimer.vue"

import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { usePomixStore } from "@/stores/pomix"
import { PhBell, PhBellSlash } from "@phosphor-icons/vue"


const PomixStore = usePomixStore()
const winSize = ref(1200)
const { categories, activeCategory, currentSession } = storeToRefs(PomixStore)

const renderSteps = ref(true)
const notificationPermission = ref(Notification.permission)

watch([categories, activeCategory, currentSession], async (state) => {
    renderSteps.value = false
    await nextTick()
    renderSteps.value = true
}, { deep: true })

async function requestNotificationPermission() {
    const permission = await Notification.requestPermission()
    notificationPermission.value = permission
    if (permission === 'granted') {
        new Notification('Notifications Enabled!', {
            body: 'You will now receive alerts when your timer completes.',
            icon: '/logo.png'
        })
    }
}

function handleKeydown(event: KeyboardEvent) {
    const formElements = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
    const target = event.target as HTMLElement
    if (formElements.includes(target?.tagName)) {
        return
    }
    if (event.key === "r") {
        PomixStore.resetTimer()
    }
    else if (event.key === " ") {
        event.preventDefault()
        if (PomixStore.isPaused) {
            PomixStore.startTimer()
        } else {
            PomixStore.pauseTimer()
        }
    } else if (event.key === "n") {
        PomixStore.skipRound()
    }
}

onMounted(() => {
    document.addEventListener("keydown", handleKeydown)
    winSize.value = window.innerWidth
    window.addEventListener('resize', () => {
        winSize.value = window.innerWidth
    })
})

onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown)
})
</script>

<template>
    <div class="w-full h-full">
        <!-- Notification Permission Banner -->
        <Transition name="slide">
            <div v-if="notificationPermission !== 'granted'" 
                class="alert alert-info mb-4 flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <PhBellSlash :size="20" />
                    <span>Enable notifications to get alerts when your timer completes</span>
                </div>
                <button 
                    @click="requestNotificationPermission" 
                    class="btn btn-sm btn-primary gap-2">
                    <PhBell :size="16" />
                    Enable
                </button>
            </div>
        </Transition>

        <div class="flex flex-col items-center justify-center gap-6">
            <Steps v-if="renderSteps && winSize > 600" />
            <Timer />
            <Controls />
            <Categories />
            <Steps v-if="renderSteps && winSize < 600" />
        </div>
    </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>