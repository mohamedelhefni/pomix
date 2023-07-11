<script setup lang="ts">
import { usePomoStore } from '@/stores/pomo';
import { PhArrowCounterClockwise, PhPause, PhPlay, PhSkipForward } from '@phosphor-icons/vue';
const pomoStore = usePomoStore()
const ICON_SIZE = 40

document.addEventListener("keypress", function onEvent(event) {
    const formElements = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
    event = event || window.event;
    //@ts-ignore
    if (formElements.includes(event?.target?.tagName)) {
        return
    }
    if (event.key === "r") {
        pomoStore.resetTimer()
    }
    else if (event.key === " ") {
        if (pomoStore.isPaused) {
            pomoStore.startTimer()
        } else {
            pomoStore.pauseTimer()
        }
    } else if (event.key === "n") {
        // move to next
        pomoStore.skipRound()
    }
});

</script>

<template>
    <div class="flex items-center gap-3">
        <button class="flex flex-col gap-3 items-center justify-center">
            <PhArrowCounterClockwise @click="pomoStore.resetTimer()" :size="ICON_SIZE"
                class="text-base-content border border-base-content rounded-full p-1.5" />

            <span><kbd class="kbd kbd-sm">R</kbd></span>
        </button>
        <button class="flex flex-col gap-1 items-center justify-center">
            <PhPlay v-if="pomoStore.isPaused" @click="pomoStore.startTimer()" :size="ICON_SIZE + 10"
                class="text-base-content" weight="fill" />
            <PhPause v-else @click="pomoStore.pauseTimer()" :size="ICON_SIZE + 10" class="text-base-content"
                weight="fill" />
            <span><kbd class="kbd kbd-sm">Space</kbd></span>
        </button>

        <button class="flex flex-col gap-3 items-center justify-center">
            <PhSkipForward @click="pomoStore.skipRound()" :size="ICON_SIZE"
                class="text-base-content border border-base-content rounded-full p-1.5" />
            <span><kbd class="kbd kbd-sm">N</kbd></span>
        </button>
    </div>
</template>