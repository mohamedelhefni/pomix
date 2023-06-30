import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface CategoryItem {
    color: string
    name: string
}

export const usePomoStore = defineStore("pomo", () => {
    const categories: Ref<CategoryItem[]> = ref([])
    const activeCategory: Ref<CategoryItem | null> = ref(null)

    function setActiveCategory(category: CategoryItem) {
        activeCategory.value = category
    }

    function addCategory(category: CategoryItem) {
        categories.value.push(category)
    }


    return { categories, activeCategory, setActiveCategory, addCategory }
})
