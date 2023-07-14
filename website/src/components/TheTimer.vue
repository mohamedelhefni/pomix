<script setup lang="ts">
import { usePomixStore } from "@/stores/pomix"
import { EMOJIS } from "@/types/constatns"
import { onMounted, ref } from "vue";
const PomixStore = usePomixStore()

const timerSize = ref(25)

onMounted(() => {
    if (!PomixStore.isPaused) {
        PomixStore.startTimer()
    }
    if (window.innerWidth < 600) {
        timerSize.value = 22
    }
})


</script>

<template>
    <div class="counter ">
        <div class="radial-progress"
            :style="{ '--value': (PomixStore.getCounterProgress()), '--size': timerSize + 'rem', '--thickness': 2 + 'rem', color: PomixStore.activeCategory?.color }">
            <div class="flex flex-col items-center gap-4 text-base-content">
                <p class="text-6xl">{{ PomixStore.isWorking ? EMOJIS.WORK_DURATION : EMOJIS.BREAK_DURATION }}</p>
                <p class="text-5xl font-bold">{{ PomixStore.currentTime }}</p>
            </div>
        </div>
    </div>
</template>