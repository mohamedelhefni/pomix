<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue';
import { useUIStore } from "./stores/ui"
import Modals from "./components/TheModals.vue"
const uiStore = useUIStore()


</script>

<template>
  <div :data-theme="uiStore.theme">
    <Modals />
    <div class="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
      <SideBar />
      <div class="lg:w-[300px]"></div>
      <div class="drawer-content">
        <RouterView class="h-full" />
      </div>
    </div>
  </div>
</template>

<style >
.router-link-active {
  @apply bg-base-300
}
</style>
