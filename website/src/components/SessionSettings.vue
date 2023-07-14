<script setup lang="ts">
import { usePomoStore } from '@/stores/pomo';
import SessionSlider from './SessionSlider.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const pomoStore = usePomoStore()

const { workDuration, shortBreakDuration, longBreakDuration, sessionRounds, isAutoStart, longBreakAfter } = storeToRefs(pomoStore)
const { setWorkDuration, setLongBreakDuration, setShortBreakDuration, setSessionRounds, setLongBreakAfter, setIsAutoStart } = pomoStore

const isAuto = ref(isAutoStart)

</script>

<template>
    <div class="flex flex-col gap-3 w-3/4  p-3 mt-2">
        <SessionSlider @input="(e: any) => setWorkDuration(+e.target.value)" title="Work Duration" :min="5" :max="120"
            :value="workDuration" label="min" />
        <SessionSlider @input="(e: any) => setShortBreakDuration(+e.target.value)" title=" Short break duration" :min="1"
            :max="30" :value="shortBreakDuration" label="min" />
        <SessionSlider @input="(e: any) => setLongBreakDuration(+e.target.value)" title=" Long break duration" :min="1"
            :max="120" :value="longBreakDuration" label="min" />
        <SessionSlider @input="(e: any) => setSessionRounds(+e.target.value)" title="Session Rounds" :min="2" :max="15"
            :value="sessionRounds" label="sessions" />
        <div class="form-control">
            <label class="cursor-pointer label">
                <h3 class="label-text text-base-content text-md">Long Break after</h3>
                <input @input="(e: any) => setLongBreakAfter(+e.target.value)" type="number"
                    class="input input-xs input-bordered" :value="longBreakAfter" min="2" max="15" />
            </label>
        </div>
        <div class="form-control">
            <label class="cursor-pointer label">
                <h3 class="label-text text-base-content text-md">Auto Start</h3>
                <input @input="(e: any) => setIsAutoStart(isAuto.valueOf())" type="checkbox" checked="true" class="checkbox"
                    :value="isAutoStart" v-model="isAuto" />
            </label>
        </div>
    </div>
</template>