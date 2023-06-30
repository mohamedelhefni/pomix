<script setup lang="ts">
import { usePomoStore } from "@/stores/pomo"
import { storeToRefs } from "pinia";
const pomoStore = usePomoStore()
const { sessionRounds, currentSession } = storeToRefs(pomoStore)

</script>

<template>
    <ul class="steps steps-vertical lg:steps-horizontal">
        <li v-for="(step) in Array(sessionRounds).fill(null).map((_, i) => i + 1) " :key="step" class="step"
            :class="{ 'step-neutral': step <= currentSession }">
            {{ (step) % 2 == 0 ? "Focus" : "Break" }}
        </li>
    </ul>
</template>