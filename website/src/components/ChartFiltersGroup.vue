<script setup lang="ts">
import { PhClock, PhSquaresFour } from '@phosphor-icons/vue';

</script>

<template>
    <div class="btn-group">
        <button class="btn btn-sm btn-active">
            <PhClock :size="24" />
            Sessions
        </button>
        <button class="btn btn-sm ">
            <PhSquaresFour :size="24" />
            Categories
        </button>

    </div>
</template>