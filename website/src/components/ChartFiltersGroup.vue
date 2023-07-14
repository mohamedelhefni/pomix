<script setup lang="ts">
import { useChartsStore } from '@/stores/charts';
import { PhCircle, PhClock, PhSquaresFour } from '@phosphor-icons/vue';
const chartStore = useChartsStore()


</script>

<template>
    <div class="btn-group flex-wrap">
        <button  class="btn btn-sm" @click="chartStore.setFilterType('categories')"
            :class="{ 'btn-active': chartStore.filterType == 'categories' }">
            <PhSquaresFour :size="24" />
            Categories
        </button>

        <button class="btn btn-sm" @click="chartStore.setFilterType('sessions')"
            :class="{ 'btn-active': chartStore.filterType == 'sessions' }">
            <PhClock :size="24" />
            Sessions
        </button>
        <button class="btn btn-sm " @click="chartStore.setFilterType('rounds')"
            :class="{ 'btn-active': chartStore.filterType == 'rounds' }">
            <PhCircle :size="24" />
            Rounds
        </button>
    </div>
</template>