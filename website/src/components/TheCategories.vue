<script setup lang="ts">
import { usePomixStore } from '@/stores/pomix';
import { PhCaretDown } from '@phosphor-icons/vue';

const PomixStore = usePomixStore()
</script>

<template>
    <div class="flex flex-col items-center gap-2">
        <span class="text-xs opacity-60 uppercase tracking-wider mt-5">Current Category</span>
        <button 
            class="btn btn-outline gap-2 min-w-[200px] justify-between transition-all duration-200 hover:scale-105"
            onclick="categoriesModal.showModal()"
            :style="{ borderColor: PomixStore.activeCategory?.color }">
            <div class="flex items-center gap-2">
                <span 
                    class="w-3 h-3 rounded-full" 
                    :style="{ backgroundColor: PomixStore.activeCategory?.color }">
                </span>
                <span class="font-medium">{{ PomixStore.activeCategory?.name }}</span>
            </div>
            <PhCaretDown :size="16" />
        </button>
    </div>
</template>
