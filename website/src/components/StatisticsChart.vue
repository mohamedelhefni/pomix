<script setup lang="ts">

import { onMounted } from "vue";
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

    chart.resize(1200, 400)

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
        if (chartStore.chartType == 'doughnut') {
            chart.resize(400, 400)
        } else {
            chart.resize(1200, 400)
        }
    })
}, true)



</script>

<template>
    <div class="mx-auto py-5 mt-8 ">
        <canvas id="chart"> </canvas>
    </div>
</template>
