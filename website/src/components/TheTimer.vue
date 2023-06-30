<script setup lang="ts">
import { usePomoStore } from "@/stores/pomo"
const pomoStore = usePomoStore()

</script>

<template>
    <div class="counter ">
        <div class="radial-progress" style="--value:100; --size:25rem; --thickness: 2rem;">
            <div class="flex flex-col items-center gap-4 ">
                <p class="text-6xl">👨‍💻</p>
                <p class="text-5xl font-bold">25:00</p>
            </div>
        </div>
    </div>
</template>