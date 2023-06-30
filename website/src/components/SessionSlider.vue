<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    min: Number,
    max: Number,
    value: Number,
    step: Number,
    title: String,
    label: String
})

defineEmits(['update:modelValue'])

const rangeValue = ref(props.value || 20)

</script>


<template>
    <div class="flex flex-col">
        <h3 class="text-base-content ">{{ props.title }}</h3>
        <div class="tooltip tooltip-open tooltip-right" :data-tip="`${rangeValue} ${label}`">
            <input type="range" :min="props.min" :max="props.max" :step="props.step" v-model="rangeValue" @input="
                $emit('update:modelValue', ($event.target as HTMLInputElement).value)
                " class="range range-xs pr-2" />
        </div>
    </div>
</template>