<script setup lang="ts">
import { usePomixStore } from '@/stores/pomix';
import { PhArrowCounterClockwise, PhPause, PhPlay, PhSkipForward } from '@phosphor-icons/vue';
import { ref } from 'vue';

const PomixStore = usePomixStore()
const ICON_SIZE = 36

// Confirmation state
const showResetConfirm = ref(false)
const showSkipConfirm = ref(false)

function handleReset() {
    if (!PomixStore.isPaused && PomixStore.counter < PomixStore.workDuration * 60 - 10) {
        showResetConfirm.value = true
        setTimeout(() => showResetConfirm.value = false, 3000)
    } else {
        PomixStore.resetTimer()
    }
}

function confirmReset() {
    showResetConfirm.value = false
    PomixStore.resetTimer()
}

function handleSkip() {
    if (!PomixStore.isPaused && PomixStore.counter > 60) {
        showSkipConfirm.value = true
        setTimeout(() => showSkipConfirm.value = false, 3000)
    } else {
        PomixStore.skipRound()
    }
}

function confirmSkip() {
    showSkipConfirm.value = false
    PomixStore.skipRound()
}

function toggleTimer() {
    if (PomixStore.isPaused) {
        PomixStore.startTimer()
    } else {
        PomixStore.pauseTimer()
    }
}
</script>

<template>
    <div class="flex flex-col items-center gap-4">
        <!-- Main Controls -->
        <div class="flex items-center gap-6">
            <!-- Reset Button -->
            <div class="relative">
                <div class="tooltip" :data-tip="showResetConfirm ? 'Click again to confirm' : 'Reset timer'">
                    <button 
                        @click="showResetConfirm ? confirmReset() : handleReset()"
                        class="btn btn-circle btn-outline transition-all duration-200"
                        :class="{ 
                            'btn-warning': showResetConfirm,
                            'btn-ghost': !showResetConfirm 
                        }">
                        <PhArrowCounterClockwise :size="ICON_SIZE - 8" weight="bold" />
                    </button>
                </div>
                <kbd class="kbd kbd-xs absolute -bottom-6 left-1/2 -translate-x-1/2">R</kbd>
            </div>

            <!-- Play/Pause Button -->
            <div class="relative">
                <div class="tooltip" :data-tip="PomixStore.isPaused ? 'Start timer' : 'Pause timer'">
                    <button 
                        @click="toggleTimer"
                        class="btn btn-circle btn-lg transition-all duration-200"
                        :class="{
                            'btn-primary': PomixStore.isPaused,
                            'btn-secondary': !PomixStore.isPaused
                        }">
                        <PhPlay v-if="PomixStore.isPaused" :size="ICON_SIZE" weight="fill" />
                        <PhPause v-else :size="ICON_SIZE" weight="fill" />
                    </button>
                </div>
                <kbd class="kbd kbd-xs absolute -bottom-6 left-1/2 -translate-x-1/2">Space</kbd>
            </div>

            <!-- Skip Button -->
            <div class="relative">
                <div class="tooltip" :data-tip="showSkipConfirm ? 'Click again to confirm' : 'Skip to next'">
                    <button 
                        @click="showSkipConfirm ? confirmSkip() : handleSkip()"
                        class="btn btn-circle btn-outline transition-all duration-200"
                        :class="{ 
                            'btn-warning': showSkipConfirm,
                            'btn-ghost': !showSkipConfirm 
                        }">
                        <PhSkipForward :size="ICON_SIZE - 8" weight="bold" />
                    </button>
                </div>
                <kbd class="kbd kbd-xs absolute -bottom-6 left-1/2 -translate-x-1/2">N</kbd>
            </div>
        </div>

        <!-- Confirmation Messages -->
        <Transition name="fade">
            <div v-if="showResetConfirm" class="alert alert-warning py-2 px-4 text-sm">
                <span>Timer is running. Click reset again to confirm.</span>
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="showSkipConfirm" class="alert alert-warning py-2 px-4 text-sm">
                <span>Skip this round? Click again to confirm.</span>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>