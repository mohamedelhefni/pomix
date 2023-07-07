<script setup lang="ts">
import { usePomoStore } from '@/stores/pomo';

const pomoStore = usePomoStore()

</script>

<template>
    <div class="flex flex-col items-center">
        <button class="btn" onclick="categoriesModal.showModal()">
            {{ pomoStore.activeCategory?.name }}
            <span class="badge badge-sm" :style="{ backgroundColor: pomoStore.activeCategory?.color }"></span>
        </button>
    </div>
</template>
