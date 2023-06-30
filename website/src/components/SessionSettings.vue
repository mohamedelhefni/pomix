<script setup lang="ts">
import { usePomoStore } from '@/stores/pomo';
import SessionSlider from './SessionSlider.vue';
import { storeToRefs } from 'pinia';
const pomoStore = usePomoStore()
const { workDuration, shortBreakDuration, longBreakDuration, sessionRounds } = storeToRefs(pomoStore)
const { setWorkDuration, setLongBreakDuration, setShortBreakDuration, setSessionRounds } = pomoStore


</script>

<template>
    <div class="flex flex-col gap-3 w-4/12 p-3 mt-2">
        <SessionSlider @input="(e: any) => setWorkDuration(+e.target.value)" title="Work Duration" :min="5" :max="120"
            :value="workDuration" label="min" />
        <SessionSlider @input="(e: any) => setShortBreakDuration(+e.target.value)" title=" Short break duration" :min="1"
            :max="30" :value="shortBreakDuration" label="min" />
        <SessionSlider @input="(e: any) => setLongBreakDuration(+e.target.value)" title=" Long break duration" :min="1"
            :max="120" :value="longBreakDuration" label="min" />
        <SessionSlider @input="(e: any) => setSessionRounds(+e.target.value)" title="Session Rounds" :min="2" :max="15"
            :value="sessionRounds" label="sessions" />
    </div>
</template>