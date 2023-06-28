<script setup lang="ts">
import { useUIStore } from '@/stores/ui';
import { ref } from 'vue';

const uiStore = useUIStore()
const themes = ["light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",]

let closeButton = ref()

function changeBodyTheme(theme: string) {
    document.body.setAttribute('data-theme', theme)
    uiStore.setTheme(theme)
    closeButton.value.click()
}
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="collapse collapse-arrow bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                Themes
            </div>
            <div class="collapse-content">
                <div class="themes grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <div v-for="theme in themes" class="theme" :key="theme" :data-theme="theme"
                        @click="changeBodyTheme(theme)">
                        <div class="p-5 rounded rounded shadow cursor-pointer border border-base-800"
                            :class="{ 'border-base-content border-2': uiStore.theme == theme }">
                            <h4 class="py-3 font-bold">{{ theme }}</h4>
                            <div class="flex items-center gap-2 w-full flex-wrap">
                                <span class="badge">A</span>
                                <span class="badge badge-neutral">A</span>
                                <span class="badge badge-primary">A</span>
                                <span class="badge badge-secondary">A</span>
                                <span class="badge badge-accent">A</span>
                                <span class="badge badge-ghost">A</span>
                                <span class="badge badge-link">A</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>