<script setup lang="ts">

import { onMounted, ref, type Ref } from "vue";
import Chart from 'chart.js/auto'
import { useChartsStore } from '@/stores/charts';

const chartStore = useChartsStore()
let chart: any;


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
    chart = new Chart(
        //@ts-ignore
        ctx,
        {
            type: chartStore.chartType,
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                    }
                ]
            }
        }
    );


})

chartStore.$onAction(({ after }) => {
    after(() => {
        let ctx = document.getElementById('chart')
        chart.destroy()
        chart = new Chart(
            //@ts-ignore
            ctx,
            {
                type: chartStore.chartType,
                data: {
                    labels: data.map(row => row.year),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        );
    })
}, true)



</script>

<template>
    <div
        :class="{ 'w-1/2 mx-auto my-5 py-5': chartStore.chartType == 'doughnut', 'w-full': chartStore.chartType != 'doughnut' }">
        <canvas id="chart"></canvas>
    </div>
</template>
