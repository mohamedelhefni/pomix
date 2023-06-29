<script setup lang="ts">
import Card from "./DaisyCard.vue"
import Chart from "./StatisticsChart.vue"
import ChartTypesGroup from "./ChartTypesGroup.vue";
import SessionDurationGroup from "./SessionDurationGroup.vue"
import ChartFiltersGroup from "./ChartFiltersGroup.vue"


</script>

<template>
    <div class="flex flex-col gap-3 w-full">
        <div class="flex items-center justify-between gap-2">
            <Card title="Basic Graph" class="w-10/12">
                <div class="flex flex-wrap items-center justify-between gap-2 ">
                    <ChartTypesGroup />
                    <div class="flex flex-wrap items-center gap-3">
                        <ChartFiltersGroup />
                        <div class="divider divider-horizontal"></div>
                        <SessionDurationGroup />
                    </div>
                </div>
                <Chart />
            </Card>
        </div>
    </div>
</template>