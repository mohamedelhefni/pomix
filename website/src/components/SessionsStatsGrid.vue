<script setup lang="ts">
import Card from "./DaisyCard.vue"
import Chart from "./StatisticsChart.vue"
import ChartTypesGroup from "./ChartTypesGroup.vue";
import FilterDurationGroup from "./FilterDurationGroup.vue"
import ChartFiltersGroup from "./ChartFiltersGroup.vue"
import { useChartsStore } from "@/stores/charts";
import { storeToRefs } from "pinia";
import { ref, watch, nextTick } from "vue";



const chartStore = useChartsStore()
const { filterType, duraitonFilterType, chartType } = storeToRefs(chartStore)

const renderChart = ref(true)

watch([filterType, duraitonFilterType, chartType], async (state) => {
    renderChart.value = false
    await nextTick()
    renderChart.value = true
}, { deep: true })




</script>

<template>
    <div class="flex flex-col gap-3 w-3/4 mx-auto">
        <div class="flex items-center justify-between gap-2">
            <Card title="Basic Graph" class="w-10/12">
                <div class="flex flex-wrap items-center justify-between gap-2 ">
                    <ChartTypesGroup />
                    <div class="flex flex-wrap items-center gap-3">
                        <ChartFiltersGroup />
                        <div class="divider divider-horizontal"></div>
                        <FilterDurationGroup />
                    </div>
                </div>
                <Chart v-if="renderChart" />
            </Card>
        </div>
    </div>
</template>