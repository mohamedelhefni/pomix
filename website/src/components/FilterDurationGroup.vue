<script setup lang="ts">
import { useChartsStore } from '@/stores/charts';
const chartStore = useChartsStore()


</script>

<template>
    <div class="btn-group">
        <button class="btn btn-sm " @click="chartStore.setDuraitonFilterType('day')"
            :class="{ 'btn-active': chartStore.duraitonFilterType == 'day' }">
            Day
        </button>
        <button class="btn btn-sm " @click="chartStore.setDuraitonFilterType('week')"
            :class="{ 'btn-active': chartStore.duraitonFilterType == 'week' }">
            Week
        </button>
        <button class="btn btn-sm " @click="chartStore.setDuraitonFilterType('month')"
            :class="{ 'btn-active': chartStore.duraitonFilterType == 'month' }">
            Month
        </button>
        <button class="btn btn-sm " @click="chartStore.setDuraitonFilterType('year')"
            :class="{ 'btn-active': chartStore.duraitonFilterType == 'year' }">
            Year
        </button>
        <button class="btn btn-sm " @click="chartStore.setDuraitonFilterType('all')"
            :class="{ 'btn-active': chartStore.duraitonFilterType == 'all' }">
            All
        </button>
    </div>
</template>
 
