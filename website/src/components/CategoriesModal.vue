<script  setup lang="ts">
import { usePomoStore } from '@/stores/pomo';
import type { CategoryItem } from '@/types/types';
import { UUID } from '@/utils/uuid';
import { PhCheck, PhPen, PhPlus, PhPlusCircle, PhTrash } from '@phosphor-icons/vue';
import { ref } from 'vue';

const pomoStore = usePomoStore()
const editCategoryId = ref()
const categoryColor = ref("#000000")
const categoryName = ref("")
const showAdd = ref(false)
const isEdit = ref(false)


function showEdit(category: CategoryItem) {
    showAdd.value = true
    isEdit.value = true
    categoryName.value = category.name
    categoryColor.value = category.color
    editCategoryId.value = category.id
}

</script>

<template>
    <dialog id="categoriesModal" class="modal">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">Categories</h3>
            <ul class="menu rounded-box gap-1">
                <li v-for="category in pomoStore.categories" :key="category.id" class="group"
                    @click.stop="pomoStore.setActiveCategory(category)">
                    <a
                        :class="{ 'bg-base-content text-base-200': (pomoStore.activeCategory && pomoStore.activeCategory.id == category.id) }">
                        {{ category.name }}
                        <span class="badge badge-sm " :style="{ backgroundColor: category.color }"></span>
                        <PhTrash :size="18" class="hidden group-hover:block" />
                        <PhPen @click.stop="showEdit(category)" :size="18" class="hidden group-hover:block" />
                    </a>
                </li>

                <li>
                    <a @click="showAdd = !showAdd">
                        <PhPlusCircle :size="22" class="text-base-content" />
                        Add Category
                    </a>
                </li>

            </ul>
            <div v-if="showAdd" class="join mx-auto w-full justify-center">
                <input v-model="categoryName" class="input input-bordered join-item" type="text"
                    placeholder="Category Name" />
                <input v-model="categoryColor" class="input input-bordered join-item w-[100px]" type="color"
                    placeholder="Category Color" />
                <button v-if="isEdit" @click.prevent="() => {
                    pomoStore.editCategory({ id: editCategoryId, name: categoryName, color: categoryColor })
                    showAdd = false
                }" class="btn join-item rounded-r-full">
                    <PhCheck :size="22" />
                </button>
                <button v-else @click.prevent="() => {
                    pomoStore.addCategory({ id: UUID(), name: categoryName, color: categoryColor })
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