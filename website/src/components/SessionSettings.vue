<script setup lang="ts">
import SessionSlider from './SessionSlider.vue';


</script>

<template>
    <div class="flex flex-col gap-3 w-4/12 p-3 mt-2">
        <SessionSlider title="Work Duration" :min="5" :max="120" :value="25" label="min" />
        <SessionSlider title="Short break duration" :min="1" :max="30" :value="5" label="min" />
        <SessionSlider title="Long break duration" :min="1" :max="45" :value="20" label="min" />
        <SessionSlider title="Session Rounds" :min="2" :max="15" :value="4" label="sessions" />
    </div>
</template>