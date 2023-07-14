<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from './TheLogo.vue';
import { PhGear, PhGithubLogo, PhHouse, PhPresentationChart, PhTwitterLogo } from '@phosphor-icons/vue';
</script>

<template>
    <div class="drawer-side z-50">
        <label for="sidebar-drawer" class="drawer-overlay"></label>
        <div class="flex flex-col justify-between  w-[300px] h-full bg-base-200 text-base-content gap-4 items-center py-10">
            <div class="">
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


                </ul>


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
    </div>
    <nav>
    </nav>
</template>