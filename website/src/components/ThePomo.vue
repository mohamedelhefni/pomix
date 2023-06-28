<script setup lang="ts">
import Timer from "./TheTimer.vue"
import Controls from "./TheControls.vue"
import Steps from "./TheSteps.vue"
import Categories from "./TheCategories.vue"

</script>

<template>
    <div class="flex flex-col items-center  w-full h-full p-5">
        <div class="flex flex-col items-center gap-5 mt-10">
            <Steps />
            <Timer />
            <Controls />
            <Categories />
        </div>
    </div>
</template>