import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Chart } from 'chart.js/auto'

export const useChartsStore = defineStore('charts', () => {
    type chartTypes = 'line' | 'bar' | 'doughnut'
    const chartType: Ref<chartTypes> = ref('line')
    const activeChart: any = ref();
    let chart: any;
    const chartCtx: any = ref()
    const chartData: any = ref([])

    function drawChart(ctx: any, data: any) {
        if (chart) {
            chart.destroy()
        }
        chart = new Chart(
            ctx,
            {
                type: chartType.value,
                data: {
                    labels: data.map((row: any) => row.year),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: data.map((row: any) => row.count)
                        }
                    ]
                }
            }
        );
        if (chartType.value == 'doughnut') {
            chart.resize(400, 400)
        }
        chartCtx.value = ctx
        chartData.value = data
    }


    function setChartType(type: chartTypes) {
        if (type) {
            chartType.value = type
        }
        if (chart) {
            drawChart(chartCtx.value, chartData.value)
        }
    }



    return { chartType, setChartType, activeChart, chart, drawChart }
})
