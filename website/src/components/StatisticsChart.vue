<script setup lang="ts">

import { onMounted } from "vue";
import { useChartsStore } from '@/stores/charts';
import { usePomoStore } from "@/stores/pomo";
import { storeToRefs } from "pinia";
import type { RoundItem, SessionItem } from "@/types/types";
import { TIME_FILTERS } from "@/types/constatns"

const chartStore = useChartsStore()
const pomoStore = usePomoStore()
const { sessions, categories, currentSession } = storeToRefs(pomoStore)
const { chartType, filterType } = storeToRefs(chartStore)


const DAY_MILLISECONDS = 24 * 60 * 60 * 1000



function getCategoriesData(): any[] {
    let catMp = new Map(categories.value.filter(cat => !cat.isDeleted).map(cat => [cat.id, { id: cat.id, name: cat.name, color: cat.color, count: 0 }]))
    let clonedSessions = JSON.parse(JSON.stringify(sessions.value))
    clonedSessions.push(JSON.parse(JSON.stringify(currentSession.value)))


    clonedSessions.filter((session: SessionItem) => (session?.startDate) && ((Date.now() - (DAY_MILLISECONDS * TIME_FILTERS[chartStore.duraitonFilterType as keyof typeof TIME_FILTERS]))) < session?.startDate).forEach((session: SessionItem) => {
        session.rounds.forEach((round: RoundItem) => {
            if (round.isBreak) return
            if (round.categoryId && catMp.has(round.categoryId)) {
                let category = catMp.get(round?.categoryId) || { id: "none", name: "none", color: "#fff", count: 0 }
                category.count++
                catMp.set(category?.id, category)
            }
        })
    })
    const data = Array.from(catMp).map(([_, value]) => ({ category: value.name, count: value.count, color: value.color }))
    return data
}


const data = filterType.value == 'categories' && chartType.value != 'line' ? getCategoriesData() : []


onMounted(() => {
    let ctx = document.getElementById('chart')
    chartStore.drawChart(ctx, {
        labels: data.map((row: any) => row.category),
        datasets: [
            {
                label: "Group by Category",
                data: data.map((row: any) => row.count),
                backgroundColor: data.map((row: any) => row.color)
            }
        ],

    })
})


</script>

<template>
    <div class="py-5 mt-8 ">
        <canvas id="chart"> </canvas>
    </div>
</template>
