<script setup lang="ts">
import { usePomixStore } from "@/stores/pomix"
import { EMOJIS } from "@/types/constatns"
import { onMounted, ref, computed } from "vue";
import { formatDuration } from "@/utils/timeFormat";

const PomixStore = usePomixStore()

const timerSize = ref(25)

// Computed properties for better UX
const statusText = computed(() => {
    if (PomixStore.isPaused) {
        return PomixStore.isWorking ? 'Ready to focus' : 'Break time'
    }
    return PomixStore.isWorking ? 'Stay focused!' : 'Relax & recharge'
})

const timeRemaining = computed(() => {
    const minutes = Math.floor(PomixStore.counter / 60)
    return formatDuration(minutes)
})

const progressPercent = computed(() => {
    return 100 - PomixStore.getCounterProgress()
})

onMounted(() => {
    if (!PomixStore.isPaused) {
        PomixStore.startTimer()
    }
    if (window.innerWidth < 600) {
        timerSize.value = 20
    }
})
</script>

<template>
    <div class="counter flex flex-col items-center gap-4">
        <!-- Status Badge -->
        <div class="badge badge-lg gap-2" :class="{
            'badge-primary': PomixStore.isWorking && !PomixStore.isPaused,
            'badge-secondary': !PomixStore.isWorking && !PomixStore.isPaused,
            'badge-ghost': PomixStore.isPaused
        }">
            <span class="animate-pulse" v-if="!PomixStore.isPaused">●</span>
            {{ statusText }}
        </div>

        <!-- Timer Circle -->
        <div class="radial-progress transition-all duration-300"
            :style="{ 
                '--value': PomixStore.getCounterProgress(), 
                '--size': timerSize + 'rem', 
                '--thickness': '1.5rem',
                color: PomixStore.isPaused ? 'oklch(var(--bc) / 0.3)' : PomixStore.activeCategory?.color 
            }"
            :class="{ 'opacity-60': PomixStore.isPaused }">
            <div class="flex flex-col items-center gap-2 text-base-content">
                <p class="text-5xl">{{ PomixStore.isWorking ? EMOJIS.WORK_DURATION : EMOJIS.BREAK_DURATION }}</p>
                <p class="text-5xl font-bold tabular-nums">{{ PomixStore.currentTime }}</p>
                <p class="text-sm opacity-70">{{ timeRemaining }} remaining</p>
            </div>
        </div>

        <!-- Session Progress -->
        <div class="flex items-center gap-2 text-sm opacity-70">
            <span>Pomodoro #{{ PomixStore.PomixCounter + 1 }}</span>
            <span>•</span>
            <span>Round {{ PomixStore.currentSession.rounds.length + 1 }}/{{ PomixStore.sessionRounds }}</span>
        </div>
    </div>
</template>

<style scoped>
.tabular-nums {
    font-variant-numeric: tabular-nums;
}
</style>