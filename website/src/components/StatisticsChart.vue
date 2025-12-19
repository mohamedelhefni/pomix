<script setup lang="ts">

import { onMounted } from "vue";
import { useChartsStore } from '@/stores/charts';
import { usePomixStore } from "@/stores/pomix";
import { storeToRefs } from "pinia";
import type { RoundItem, SessionItem } from "@/types/types";
import { TIME_FILTERS } from "@/types/constatns"
import { formatDuration, formatDurationLong } from "@/utils/timeFormat"



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
            return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        case 'month':
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        case 'all':
        case 'year':
            return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
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
            dataMp.set(sessionDate, { count: 0, duration: 0 })
        const current = dataMp.get(sessionDate)
        current.count++
        // Sum up duration from all work rounds in session
        session.rounds.forEach((round: RoundItem) => {
            if (!round.isSkipped && !round.isBreak && round.duration) {
                current.duration += round.duration
            }
        })
        dataMp.set(sessionDate, current)
    })

    const data = Array.from(dataMp).map(([key, value]) => ({ item: key, count: value.count, duration: value.duration, color: "#00ADB5" }))
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
                dataMp.set(roundDate, { count: 0, duration: 0 })
            const current = dataMp.get(roundDate)
            current.count++
            if (round.duration) {
                current.duration += round.duration
            }
            dataMp.set(roundDate, current)
        })
    })

    const data = Array.from(dataMp).map(([key, value]) => ({ item: key, count: value.count, duration: value.duration, color: "#00ADB5" }))
    return data
}


const data = filterType.value == 'categories' && chartType.value != 'line' ? getCategoriesData() : filterType.value == 'sessions' ? getSessionsData() : getRoundsData()

// Chart options with human-friendly tooltips
const chartOptions = {
    responsive: true,
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context: any) {
                    const dataIndex = context.dataIndex
                    const item = data[dataIndex]
                    const filterBy = chartStore.filterBy
                    const filterTypeValue = chartStore.filterType
                    
                    if (filterTypeValue === 'categories' && filterBy === 'duration') {
                        return `${item.item}: ${formatDurationLong(item.duration)}`
                    }
                    
                    if (filterBy === 'duration' || filterTypeValue !== 'categories') {
                        const count = item.count
                        const duration = item.duration || 0
                        const label = filterTypeValue === 'sessions' ? 'session' : 'pomodoro'
                        const labelPlural = filterTypeValue === 'sessions' ? 'sessions' : 'pomodoros'
                        return [
                            `${count} ${count === 1 ? label : labelPlural}`,
                            `Total: ${formatDurationLong(duration)}`
                        ]
                    }
                    
                    return `${item.item}: ${item.count} pomodoros`
                }
            }
        },
        legend: {
            display: chartType.value === 'doughnut'
        }
    },
    scales: chartType.value !== 'doughnut' ? {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value: any) {
                    if (chartStore.filterType === 'categories' && chartStore.filterBy === 'duration') {
                        return formatDuration(value)
                    }
                    return value
                }
            }
        }
    } : undefined
}

onMounted(() => {
    let ctx = document.getElementById('chart')
    chartStore.drawChart(ctx, {
        labels: data.map((row: any) => row.item),
        datasets: [
            {
                label: chartStore.filterBy === 'duration' ? 'Time Spent' : 
                       filterType.value === 'sessions' ? 'Sessions' : 
                       filterType.value === 'rounds' ? 'Pomodoros' : 'Pomodoros',
                data: data.map((row: any) => chartStore.filterType == 'categories' && chartStore.filterBy == 'duration' ? row.duration : row.count),
                backgroundColor: data.map((row: any) => row.color)
            }
        ],

    }, chartOptions)
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
