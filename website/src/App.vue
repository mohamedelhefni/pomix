<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue';
import { useUIStore } from "./stores/ui"
const uiStore = useUIStore()


</script>

<template>
  <div :data-theme="uiStore.theme">
    <div class="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
      <SideBar />
      <div class="lg:w-[300px]"></div>
      <div class="drawer-content p-5 flex items-start ">
        <RouterView class="" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
