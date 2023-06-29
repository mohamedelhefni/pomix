<script setup lang="ts">
import { useChartsStore } from '@/stores/charts';
import { PhChartBar, PhChartDonut, PhChartLine } from '@phosphor-icons/vue';
const chartStore = useChartsStore()


</script>
<template>
    <div class="btn-group">
        <button @click="chartStore.setChartType('line')" class="btn btn-sm "
            :class="{ 'btn-active': chartStore.chartType == 'line' }">
            <PhChartLine :size="24" />
            Line
        </button>
        <button @click="chartStore.setChartType('doughnut')" class="btn btn-sm "
            :class="{ 'btn-active': chartStore.chartType == 'doughnut' }">
            <PhChartDonut :size="24" />
            Pie
        </button>
        <button @click="chartStore.setChartType('bar')" class="btn btn-sm "
            :class="{ 'btn-active': chartStore.chartType == 'bar' }">
            <PhChartBar :size="24" />
            Bar
        </button>
    </div>
</template>