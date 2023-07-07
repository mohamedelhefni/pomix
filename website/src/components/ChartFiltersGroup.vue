<script setup lang="ts">
import { PhCircle, PhClock, PhSquaresFour } from '@phosphor-icons/vue';

interface Round {
    id: number
    startDate: Date
    endDate: Date
    workDuration: Date
    isSkipped: Boolean
    category: any
}


interface Session {
    id: number,
    startDate: Date
    endDate: Date
    rounds: Round[]
}

let stats = {
    sessions: [
        {
            id: 1,
            time: 'today',
            rounds: [
                {
                    id: 1,
                    start: '3 am',
                    end: '3: 30 am',
                    category: 1
                }
            ]
        }
    ],
    categories: [
        {
            id: 1,
            name: 'work'
        }
    ],




}

</script>

<template>
    <div class="btn-group">
        <button class="btn btn-sm btn-active ">
            <PhSquaresFour :size="24" />
            Categories
        </button>

        <button class="btn btn-sm">
            <PhClock :size="24" />
            Sessions
        </button>
        <button class="btn btn-sm ">
            <PhCircle :size="24" />
            Rounds
        </button>
    </div>
</template>