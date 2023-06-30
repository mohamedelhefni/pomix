<script setup lang="ts">
import { PhArrowCounterClockwise, PhPlay, PhSkipForward } from '@phosphor-icons/vue';
const ICON_SIZE = 40
</script>

<template>
    <div class="flex items-center gap-3">
        <button class="flex flex-col gap-3 items-center justify-center">
            <PhArrowCounterClockwise :size="ICON_SIZE"
                class="text-base-content border border-base-content rounded-full p-1.5" />

            <span><kbd class="kbd kbd-sm">R</kbd></span>
        </button>
        <button class="flex flex-col gap-1 items-center justify-center">
            <PhPlay :size="ICON_SIZE + 10" class="text-base-content" weight="fill" />
            <span><kbd class="kbd kbd-sm">Space</kbd></span>
        </button>

        <button class="flex flex-col gap-3 items-center justify-center">
            <PhSkipForward :size="ICON_SIZE" class="text-base-content border border-base-content rounded-full p-1.5" />
            <span><kbd class="kbd kbd-sm">N</kbd></span>
        </button>
    </div>
</template>