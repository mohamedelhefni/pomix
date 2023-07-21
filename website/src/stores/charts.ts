import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Chart } from 'chart.js/auto'

export const useChartsStore = defineStore('charts', () => {
    type chartTypes = 'line' | 'bar' | 'doughnut'
    type filterTypes = 'categories' | 'sessions' | 'rounds'
    type durationFilterTypes = 'day' | 'week' | 'year' | 'month' | 'all'
    type filterByTypes = 'count' | 'duration'

    const chartType: Ref<chartTypes> = ref('line')
    const activeChart: any = ref();
    const filterType: Ref<filterTypes> = ref('categories')
    const duraitonFilterType: Ref<durationFilterTypes> = ref('day')
    const filterBy: Ref<filterByTypes> = ref('count')

    let chart: any;
    const chartCtx: any = ref()
    const chartData: any = ref([])

    function drawChart(ctx: any, data: any, options = {}) {
        if (chart) {
            chart.destroy()
        }
        if (!ctx) return
        chart = new Chart(
            ctx,
            {
                type: chartType.value,
                data: data,
                options: options
            }
        );

        if (chartType.value == 'doughnut') {
            chart.resize(400, 400)
        }

        if (window.innerWidth < 600) {
            chart.resize(350, 600)
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

    function setFilterType(type: filterTypes) {
        filterType.value = type
    }

    function setDuraitonFilterType(type: durationFilterTypes) {
        duraitonFilterType.value = type
    }

    function setFilterBy(type: filterByTypes) {
        filterBy.value = type
    }


    return { chartType, setChartType, activeChart, chart, drawChart, filterType, setFilterType, duraitonFilterType, setDuraitonFilterType, filterBy, setFilterBy }
})
