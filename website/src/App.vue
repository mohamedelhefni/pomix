<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue';
import { useUIStore } from "./stores/ui"
import Modals from "./components/TheModals.vue"
import { PhList } from '@phosphor-icons/vue';
const uiStore = useUIStore()


</script>

<template>
  <div :data-theme="uiStore.theme" class="bg-base-100 w-full h-full">
    <Modals />
    <div class="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
      <SideBar />
      <div class="lg:w-[300px]"></div>
      <div class="drawer-content flex flex-col items-start  overflow-scroll z-0 ">
        <label for="sidebar-drawer" class="self-end sm:hidden">
          <PhList :size="28" class="w-10 text-base-content hover:bg-base-100 rounded p-1 block " />
        </label>
        <RouterView class="w-full h-screen p-5 pb-18" />
      </div>
    </div>
  </div>
</template>

<style >
.router-link-active {
  @apply bg-base-300
}
</style>
