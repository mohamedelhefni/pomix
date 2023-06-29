<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from './TheLogo.vue';
import {  PhGear, PhHouse, PhInfo, PhPresentationChart } from '@phosphor-icons/vue';
</script>

<template>
    <div class="drawer-side">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <div class="flex flex-col w-[300px] h-full bg-base-200 text-base-content gap-4 items-center py-10">
            <Logo class="-ml-3" />
            <ul class="menu menu-lg rounded-box my-3 gap-3 ">
                <li>
                    <RouterLink to="/">
                        <PhHouse :size="24" class="text-base-content" />
                        Home
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/statistics">
                        <PhPresentationChart :size="24" class="text-base-content" />
                        Statistics
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings">
                        <PhGear :size="24" class="text-base-content" />
                        Settings
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/about">
                        <PhInfo :size="24" class="text-base-content" />
                        About
                    </RouterLink>
                </li>

            </ul>
        </div>
    </div>
    <nav>
    </nav>
</template>