import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useChartsStore = defineStore('charts', () => {
    type chartTypes = 'line' | 'bar' | 'doughnut'
    const chartType: Ref<chartTypes> = ref('line')
    function setChartType(type: chartTypes) {
        chartType.value = type
    }
    return { chartType, setChartType }
})
