<script setup lang="ts">
import Card from "./DaisyCard.vue"
import Chart from "./StatisticsChart.vue"
import ChartTypesGroup from "./ChartTypesGroup.vue";
import FilterDurationGroup from "./FilterDurationGroup.vue"
import ChartFiltersGroup from "./ChartFiltersGroup.vue"
import { useChartsStore } from "@/stores/charts";
import { usePomixStore } from "@/stores/pomix";
import { storeToRefs } from "pinia";
import { ref, watch, nextTick, computed } from "vue";
import { PhHourglass, PhPlusCircle, PhFlask, PhTrash, PhTimer, PhFire, PhCalendarCheck, PhTrophy } from "@phosphor-icons/vue";
import { formatDuration, getProductivityInsight } from "@/utils/timeFormat";
import type { RoundItem, SessionItem } from "@/types/types";
import { TIME_FILTERS } from "@/types/constatns";

// Dev mode detection using Vite's environment
const isDevMode = import.meta.env.DEV

const chartStore = useChartsStore()
const pomixStore = usePomixStore()
const { filterType, duraitonFilterType, chartType, filterBy } = storeToRefs(chartStore)
const { sessions: storeSessions, currentSession, categories } = storeToRefs(pomixStore)

const renderChart = ref(true)

const DAY_MILLISECONDS = 24 * 60 * 60 * 1000

// Get all sessions including current
function getAllSessions() {
    let clonedSessions = JSON.parse(JSON.stringify(storeSessions.value))
    clonedSessions.push(JSON.parse(JSON.stringify(currentSession.value)))
    return clonedSessions
}

// Filter sessions by selected time period
const dateFilter = (session: SessionItem) => {
    return (session?.startDate) && ((Date.now() - (DAY_MILLISECONDS * TIME_FILTERS[chartStore.duraitonFilterType as keyof typeof TIME_FILTERS]))) < session?.startDate
}

// Computed statistics
const stats = computed(() => {
    const sessions = getAllSessions().filter(dateFilter)
    
    let totalMinutes = 0
    let totalPomodoros = 0
    let totalSessions = sessions.length
    let skippedRounds = 0
    let categoryStats = new Map<string, { name: string, color: string, minutes: number, count: number }>()
    
    // Initialize category stats
    categories.value.filter(c => !c.isDeleted).forEach(cat => {
        categoryStats.set(cat.id, { name: cat.name, color: cat.color, minutes: 0, count: 0 })
    })
    
    sessions.forEach((session: SessionItem) => {
        session.rounds.forEach((round: RoundItem) => {
            if (round.isBreak) return
            
            if (round.isSkipped) {
                skippedRounds++
                return
            }
            
            totalPomodoros++
            if (round.duration) {
                totalMinutes += round.duration
            }
            
            // Track by category
            if (round.categoryId && categoryStats.has(round.categoryId)) {
                const cat = categoryStats.get(round.categoryId)!
                cat.count++
                cat.minutes += round.duration || 0
            }
        })
    })
    
    // Find top category
    let topCategory = { name: 'None', color: '#666', minutes: 0, count: 0 }
    categoryStats.forEach((value) => {
        if (value.minutes > topCategory.minutes) {
            topCategory = value
        }
    })
    
    // Calculate average per day
    const daysInPeriod = TIME_FILTERS[chartStore.duraitonFilterType as keyof typeof TIME_FILTERS]
    const avgMinutesPerDay = daysInPeriod !== Infinity ? totalMinutes / Math.min(daysInPeriod, 30) : totalMinutes / 30
    
    // Calculate streak (consecutive days with at least one pomodoro)
    const daysWithActivity = new Set<string>()
    sessions.forEach((session: SessionItem) => {
        if (session.startDate) {
            const date = new Date(session.startDate).toDateString()
            daysWithActivity.add(date)
        }
    })
    
    // Count current streak
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today)
        checkDate.setDate(today.getDate() - i)
        if (daysWithActivity.has(checkDate.toDateString())) {
            streak++
        } else if (i > 0) { // Allow today to not have activity yet
            break
        }
    }
    
    return {
        totalMinutes,
        totalPomodoros,
        totalSessions,
        skippedRounds,
        topCategory,
        avgMinutesPerDay,
        streak,
        insight: getProductivityInsight(totalMinutes, totalSessions, totalPomodoros)
    }
})

watch([filterType, duraitonFilterType, chartType, filterBy], async (state) => {
    chartStore.destroyChart()
    renderChart.value = false
    await nextTick()
    renderChart.value = true
}, { deep: true })

// Helper to re-render chart safely
async function reRenderChart() {
    chartStore.destroyChart()
    renderChart.value = false
    await nextTick()
    renderChart.value = true
}

// Dev mode functions
function handleGenerateRandom() {
    pomixStore.generateRandomSessions(10)
    reRenderChart()
}

function handleClearSessions() {
    pomixStore.clearAllSessions()
    reRenderChart()
}




</script>

<template>
    <div class="flex flex-col items-center gap-3 w-full mx-auto">
        <!-- Dev Mode Controls -->
        <div v-if="isDevMode" class="alert alert-warning w-10/12">
            <PhFlask :size="24" />
            <span class="font-bold">Dev Mode</span>
            <div class="flex gap-2">
                <button class="btn btn-sm btn-primary" @click="handleGenerateRandom">
                    <PhPlusCircle :size="18" />
                    Add 10 Random Sessions
                </button>
                <button class="btn btn-sm btn-error" @click="handleClearSessions">
                    <PhTrash :size="18" />
                    Clear All
                </button>
            </div>
        </div>

        <!-- Statistics Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 w-10/12">
            <!-- Total Focus Time -->
            <div class="stat bg-base-200 rounded-box p-4">
                <div class="stat-figure text-primary">
                    <PhTimer :size="32" />
                </div>
                <div class="stat-title">Focus Time</div>
                <div class="stat-value text-primary text-2xl">{{ formatDuration(stats.totalMinutes) }}</div>
                <div class="stat-desc">{{ stats.totalPomodoros }} pomodoros</div>
            </div>

            <!-- Sessions -->
            <div class="stat bg-base-200 rounded-box p-4">
                <div class="stat-figure text-secondary">
                    <PhCalendarCheck :size="32" />
                </div>
                <div class="stat-title">Sessions</div>
                <div class="stat-value text-secondary text-2xl">{{ stats.totalSessions }}</div>
                <div class="stat-desc">{{ stats.skippedRounds }} skipped</div>
            </div>

            <!-- Current Streak -->
            <div class="stat bg-base-200 rounded-box p-4">
                <div class="stat-figure text-accent">
                    <PhFire :size="32" />
                </div>
                <div class="stat-title">Streak</div>
                <div class="stat-value text-accent text-2xl">{{ stats.streak }} days</div>
                <div class="stat-desc">Keep it going!</div>
            </div>

            <!-- Top Category -->
            <div class="stat bg-base-200 rounded-box p-4">
                <div class="stat-figure">
                    <PhTrophy :size="32" :style="{ color: stats.topCategory.color }" />
                </div>
                <div class="stat-title">Top Category</div>
                <div class="stat-value text-2xl truncate" :style="{ color: stats.topCategory.color }">
                    {{ stats.topCategory.name }}
                </div>
                <div class="stat-desc">{{ formatDuration(stats.topCategory.minutes) }}</div>
            </div>
        </div>

        <!-- Insight Message -->
        <div class="alert w-10/12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ stats.insight }}</span>
        </div>

        <div class="flex items-center justify-between gap-2">
            <Card title="Basic Graph" class="w-10/12 ">
                <div class="flex flex-wrap items-center justify-between gap-2 ">
                    <ChartTypesGroup />
                    <div class="flex flex-wrap items-center gap-3">
                        <ChartFiltersGroup />
                        <div class="btn-group flex-wrap" v-if="chartStore.filterType == 'categories'">
                            <button class="btn btn-sm" @click="chartStore.setFilterBy('count')"
                                :class="{ 'btn-active': chartStore.filterBy == 'count' }">
                                <PhPlusCircle :size="24" />
                                Count
                            </button>
                            <button class="btn btn-sm" @click="chartStore.setFilterBy('duration')"
                                :class="{ 'btn-active': chartStore.filterBy == 'duration' }">
                                <PhHourglass :size="24" />
                                Duration
                            </button>
                        </div>
                        <div class="divider divider-horizontal"></div>
                        <FilterDurationGroup />
                    </div>
                </div>
                <Chart v-if="renderChart" :key="duraitonFilterType" />
            </Card>
        </div>
    </div>
</template>