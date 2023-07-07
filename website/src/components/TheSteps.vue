<script setup lang="ts">
import { usePomoStore } from "@/stores/pomo"
import { storeToRefs } from "pinia";
import { getReverseColor } from "@/utils/colorReverse"

const pomoStore = usePomoStore()
const { sessionRounds, currentRound, activeCategory } = storeToRefs(pomoStore)

</script>

<template>
    <ul class="steps steps-vertical lg:steps-horizontal">
        <li v-for="(step) in  Array(sessionRounds).fill(null).map((_, i) => i + 1)  " :key="step" class="step"
            :style="{ '--step-background-color': activeCategory?.color, '--step-color': getReverseColor(activeCategory?.color || '#fff') }"
            :class="{ 'neutral step-custom': step <= currentRound }">
            {{ (step) % 2 != 0 ? "👨‍💻" : "💤" }}
        </li>
    </ul>
</template>

<style>
.step-custom::after {
    background-color: var(--step-background-color) !important;
    color: var(--step-color) !important
}
</style>