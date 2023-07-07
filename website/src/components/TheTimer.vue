<script setup lang="ts">
import { usePomoStore } from "@/stores/pomo"
import { EMOJIS } from "@/types/constatns"
import { onMounted } from "vue";
const pomoStore = usePomoStore()

onMounted(() => {
    if (!pomoStore.isPaused) {
        pomoStore.startTimer()
    }
})



</script>

<template>
    <div class="counter ">
        <div class="radial-progress"
            :style="{ '--value': (pomoStore.getCounterProgress()), '--size': 25 + 'rem', '--thickness': 2 + 'rem', color: pomoStore.activeCategory?.color }">
            <div class="flex flex-col items-center gap-4 text-base-content">
                <p class="text-6xl">{{ pomoStore.isWorking ? EMOJIS.WORK_DURATION : EMOJIS.BREAK_DURATION }}</p>
                <p class="text-5xl font-bold">{{ pomoStore.currentTime }}</p>
            </div>
        </div>
    </div>
</template>