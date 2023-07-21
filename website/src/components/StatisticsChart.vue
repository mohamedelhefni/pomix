<script setup lang="ts">

import { onMounted } from "vue";
import { useChartsStore } from '@/stores/charts';
import { usePomixStore } from "@/stores/pomix";
import { storeToRefs } from "pinia";
import type { RoundItem, SessionItem } from "@/types/types";
import { TIME_FILTERS } from "@/types/constatns"



const chartStore = useChartsStore()
const PomixStore = usePomixStore()
const { sessions: storeSessions, categories, currentSession } = storeToRefs(PomixStore)
const { chartType, filterType } = storeToRefs(chartStore)

const DAY_MILLISECONDS = 24 * 60 * 60 * 1000

function getAllSessions() {
    let clonedSessions = JSON.parse(JSON.stringify(storeSessions.value))
    clonedSessions.push(JSON.parse(JSON.stringify(currentSession.value)))
    return clonedSessions
}

const dateFilter = (session: SessionItem) => {
    return (session?.startDate) && ((Date.now() - (DAY_MILLISECONDS * TIME_FILTERS[chartStore.duraitonFilterType as keyof typeof TIME_FILTERS]))) < session?.startDate
}

const getDate = (time: number) => {
    let date = new Date(time)
    switch (chartStore.duraitonFilterType) {
        case 'day':
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        case 'week':
        case 'month':
            return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
        case 'all':
        case 'year':
            return date.toLocaleDateString('en-US', { month: 'long' })
        default:
            break
    }
}

function getCategoriesData(): any[] {
    const catMp = new Map(categories.value.filter(cat => !cat.isDeleted).map(cat => [cat.id, { id: cat.id, name: cat.name, color: cat.color, count: 0, duration: 0 }]))
    const sessions = getAllSessions()
    sessions.filter(dateFilter).forEach((session: SessionItem) => {
        session.rounds.forEach((round: RoundItem) => {
            if (round.isSkipped || round.isBreak) return
            if (round.categoryId && catMp.has(round.categoryId)) {
                let category = catMp.get(round?.categoryId) || { id: "none", name: "none", color: "#fff", count: 0, duration: 0 }
                category.count++
                if (round.duration) {
                    category.duration += round.duration
                }
                catMp.set(category?.id, category)
            }
        })
    })
    const data = Array.from(catMp).map(([_, value]) => ({ item: value.name, count: value.count, color: value.color, duration: value.duration }))
    return data
}


function getSessionsData() {
    const sessions = getAllSessions()
    const dataMp = new Map()
    sessions.filter(dateFilter).forEach((session: SessionItem) => {
        if (!session.startDate) return
        let sessionDate = getDate(session?.startDate)
        if (!dataMp.has(sessionDate))
            dataMp.set(sessionDate, 0)
        dataMp.set(sessionDate, (dataMp.get(sessionDate) ?? 0) + 1)
    })

    const data = Array.from(dataMp).map(([key, value]) => ({ item: key, count: value, color: "#00ADB5" }))
    return data
}

function getRoundsData() {
    const sessions = getAllSessions()
    const dataMp = new Map()
    sessions.filter(dateFilter).forEach((session: SessionItem) => {
        session.rounds.forEach((round: RoundItem) => {
            if (round.isSkipped || round.isBreak) return
            if (!round.startDate) return
            let roundDate = getDate(round?.startDate)
            if (!dataMp.has(roundDate))
                dataMp.set(roundDate, 0)
            dataMp.set(roundDate, (dataMp.get(roundDate) ?? 0) + 1)
        })
    })

    const data = Array.from(dataMp).map(([key, value]) => ({ item: key, count: value, color: "#00ADB5" }))
    return data
}


const data = filterType.value == 'categories' && chartType.value != 'line' ? getCategoriesData() : filterType.value == 'sessions' ? getSessionsData() : getRoundsData()

onMounted(() => {
    let ctx = document.getElementById('chart')
    chartStore.drawChart(ctx, {
        labels: data.map((row: any) => row.item),
        datasets: [
            {
                label: filterType.value,
                data: data.map((row: any) => chartStore.filterType == 'categories' && chartStore.filterBy == 'duration' ? row.duration : row.count),
                backgroundColor: data.map((row: any) => row.color)
            }
        ],

    })
})


</script>

<template>
    <div class="py-5 mt-8 ">
        <canvas v-if="data.length > 0" id="chart"> </canvas>
        <div v-else class="flex items-center w-full">
            <h2 class="text-xl  text-base-contnet font-bold">There is not enough data</h2>
        </div>
    </div>
</template>
