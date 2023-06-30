<script setup lang="ts">

import { onMounted } from "vue";
import { useChartsStore } from '@/stores/charts';

const chartStore = useChartsStore()


const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
];


onMounted(() => {
    let ctx = document.getElementById('chart')
    chartStore.drawChart(ctx, data)
})


</script>

<template>
    <div class="py-5 mt-8 ">
        <canvas id="chart"> </canvas>
    </div>
</template>
