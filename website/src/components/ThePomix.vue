<script setup lang="ts">
import Categories from "./TheCategories.vue"
import Controls from "./TheControls.vue"
import Steps from "./TheSteps.vue"
import Timer from "./TheTimer.vue"
import { PhGithubLogo, PhTwitterLogo } from "@phosphor-icons/vue";

import { ref, watch, nextTick, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePomixStore } from "@/stores/pomix"


const PomixStore = usePomixStore()
const winSize = ref(1200)
const { categories, activeCategory, currentSession } = storeToRefs(PomixStore)

const renderSteps = ref(true)

watch([categories, activeCategory, currentSession], async (state) => {
    renderSteps.value = false
    await nextTick()
    renderSteps.value = true
}, { deep: true })

onMounted(() => {

    window.addEventListener("keydown", function onEvent(event) {
        const formElements = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
        event = event || window.event;
        //@ts-ignore
        if (formElements.includes(event?.target?.tagName)) {
            return
        }
        if (event.key === "r") {
            PomixStore.resetTimer()
        }
        else if (event.key === " ") {
            if (PomixStore.isPaused) {
                PomixStore.startTimer()
            } else {
                PomixStore.pauseTimer()
            }
        } else if (event.key === "n") {
            // move to next
            PomixStore.skipRound()
        }
    });



    winSize.value = window.innerWidth
    window.addEventListener('resize', () => {
        winSize.value = window.innerWidth
    })
})


</script>

<template>
    <div class="flex flex-col items-center justify-between  w-full h-full  ">
        <div class="flex flex-col items-center justify-center gap-5 ">
            <Steps v-if="renderSteps && winSize > 600" />
            <Timer />
            <Controls />
            <Categories />
            <Steps v-if="renderSteps && winSize < 600" />
        </div>
        <div class="flex flex-col items-center gap-3">
            <div class="">
                <span>Made by </span><a href="https://hefni101.netlify.app/" target="_blank" class="link">Mohamed
                    Elhefni</a>
            </div>
            <div class="flex gap-3">
                <a href="https://github.com/mohamedelhefni" target="_blank">
                    <PhGithubLogo :size="25" />
                </a>
                <a href="https://twitter.com/hefni101" target="_blank">
                    <PhTwitterLogo :size="25" weight="fill" />
                </a>
            </div>
        </div>
    </div>
</template>