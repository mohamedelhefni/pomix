<script  setup lang="ts">
import { usePomixStore } from '@/stores/pomix';
import type { CategoryItem } from '@/types/types';
import { UUID } from '@/utils/uuid';
import { PhCheck, PhPen, PhPlus, PhPlusCircle, PhTrash } from '@phosphor-icons/vue';

import { ref } from 'vue'


// TODO: fix bug when add or edit

const PomixStore = usePomixStore()
const editCategoryId = ref()
const categoryColor = ref("#111111")
const categoryName = ref("")
const showAdd = ref(false)
const isEdit = ref(false)

function toggleAdd() {
    showAdd.value = !showAdd.value
    isEdit.value = false
    categoryColor.value = "#000"
    categoryName.value = ""
}

function showEdit(category: CategoryItem) {
    showAdd.value = true
    isEdit.value = true
    categoryName.value = category.name
    categoryColor.value = category.color
    editCategoryId.value = category.id
}


function setColor(val: string) {
    categoryColor.value = val
}

</script>

<template>
    <dialog id="categoriesModal" class="modal">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">Categories</h3>
            <ul class="menu rounded-box gap-1">
                <template v-for="category in PomixStore.categories" :key="category.id">
                    <li v-if="!category.isDeleted" class="group" @click.stop="PomixStore.setActiveCategory(category)">
                        <a
                            :class="{ 'bg-base-content text-base-200': (PomixStore.activeCategory && PomixStore.activeCategory.id == category.id) }">
                            {{ category.name }}
                            <span class="badge badge-sm " :style="{ backgroundColor: category.color }"></span>
                            <PhTrash @click.stop="PomixStore.deleteCategory(category)" :size="18"
                                class="hidden group-hover:block" />
                            <PhPen @click.stop="showEdit(category)" :size="18" class="hidden group-hover:block" />
                        </a>
                    </li>
                </template>


                <li>
                    <a @click="toggleAdd">
                        <PhPlusCircle :size="22" class="text-base-content" />
                        Add Category
                    </a>
                </li>

            </ul>
            <div v-if="showAdd" class="join mx-auto w-full items-center justify-center gap-2">
                <input v-model="categoryName" class="input w-10/12 input-bordered join-item" type="text"
                    placeholder="Category Name" />

                <div class="w-2/12 mx-auto">
                    <ColorPicker class="" model="color" :pureColor="categoryColor" @gradiantColorChange="setColor"
                        @pureColorChange="setColor" picker-container=".modal" />
                </div>

                <button v-if="isEdit" @click.prevent="() => {
                    PomixStore.editCategory({ id: editCategoryId, name: categoryName, color: categoryColor, isDeleted: false })
                    showAdd = false
                }" class="btn join-item rounded-r-full">
                    <PhCheck :size="22" />
                </button>
                <button v-else @click.prevent="() => {
                    PomixStore.addCategory({ id: UUID(), name: categoryName, color: categoryColor, isDeleted: false })
                    showAdd = false
                }" class="btn join-item rounded-r-full">
                    <PhPlus :size="22" />
                </button>
            </div>


            <div class="modal-action">
                <button class="btn">close</button>
            </div>
        </form>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>