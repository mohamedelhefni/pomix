<script setup lang="ts">
import { usePomixStore } from '@/stores/pomix';

const PomixStore = usePomixStore()

</script>

<template>
    <div class="flex flex-col items-center">
        <button class="btn" onclick="categoriesModal.showModal()">
            {{ PomixStore.activeCategory?.name }}
            <span class="badge badge-sm" :style="{ backgroundColor: PomixStore.activeCategory?.color }"></span>
        </button>
    </div>
</template>
