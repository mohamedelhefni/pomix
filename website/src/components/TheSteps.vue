<script setup lang="ts">
import { usePomoStore } from "@/stores/pomo"
import { storeToRefs } from "pinia";
import { getReverseColor } from "@/utils/colorReverse"

const pomoStore = usePomoStore()
const { sessionRounds, activeCategory, currentSession, categories } = storeToRefs(pomoStore)

let rounds = currentSession.value.rounds.map(round => {
    round.category = categories.value.find(cat => cat.id == round.categoryId) || categories.value[0]
    return round
})


</script>

<template>
    <div class="">
        <ul class="steps steps-vertical md:steps-horizontal ">
            <li v-for="(step) in  Array(sessionRounds).fill(null).map((_, i) => i)  " :key="rounds[step]?.id || step"
                class="step"
                :style="{ '--step-background-color': rounds[step]?.category?.color || activeCategory?.color, '--step-color': getReverseColor(rounds[step]?.category?.color || activeCategory?.color) }"
                :class="{ 'neutral step-custom': step <= currentSession.rounds.length }">
                {{ (step + 1) % 2 != 0 ? "👨‍💻" : "💤" }}
            </li>
        </ul>
    </div>
</template>

<style>
.step-custom::after {
    background-color: var(--step-background-color) !important;
    color: var(--step-color) !important
}

.step-custom::before {
    background-color: var(--step-background-color) !important;
}
</style>
