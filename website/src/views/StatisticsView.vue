<script setup lang="ts">
import SessionsGrid from '../components/SessionsStatsGrid.vue';


</script>

<template>
  <div class="flex flex-col items-start  gap-3 ">
    <h1 class="text-4xl font-bold">Overview</h1>
    <SessionsGrid />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
