<script setup lang="ts">
import Timer from "./TheTimer.vue"
import Controls from "./TheControls.vue"
import Steps from "./TheSteps.vue"
import Categories from "./TheCategories.vue"
import { PhGithubLogo, PhTwitterLogo } from "@phosphor-icons/vue";

</script>

<template>
    <div class="flex flex-col items-center justify-between  w-full h-full p-5">
        <div class="flex flex-col items-center gap-5 mt-10">
            <Steps />
            <Timer />
            <Controls />
            <Categories />
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