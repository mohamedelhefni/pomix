<script setup lang="ts">
import Themes from "../components/TheThemes.vue"





</script>

<template>
  <div class="flex flex-col items-start gap-3 p-5">
    <h1 class="text-4xl font-bold">Settings</h1>
    <Themes />
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
