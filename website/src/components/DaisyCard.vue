<script setup lang="ts">
const props = defineProps({
    title: String
})
</script>

<template>
    <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title capitalize">{{ props.title }}</h2>
            <slot></slot>
        </div>
    </div>
</template>