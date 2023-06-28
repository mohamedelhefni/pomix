<script setup lang="ts">
import { PhArrowCounterClockwise, PhPlay, PhSkipForward } from '@phosphor-icons/vue';
const ICON_SIZE = 40
</script>

<template>
    <div class="flex items-center gap-3">
        <div class="reset">
            <PhArrowCounterClockwise :size="ICON_SIZE" class="text-base-content border border-base-content rounded-full p-1.5" /> </div>
        <div class="play">
            <PhPlay :size="ICON_SIZE + 10" class="text-base-content"  weight="fill"/>
        </div>
        <div class="next">
            <PhSkipForward :size="ICON_SIZE" class="text-base-content border border-base-content rounded-full p-1.5" />
        </div>
    </div>
</template>