import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface CategoryItem {
    color: string
    name: string
}

export const usePomoStore = defineStore("pomo", () => {
    const categories: Ref<CategoryItem[]> = ref([])
    const activeCategory: Ref<CategoryItem | null> = ref(null)
    const sessionRounds: Ref<any> = ref(4)
    const workDuration: Ref<any> = ref(45)
    const longBreakDuration: Ref<any> = ref(60)
    const shortBreakDuration: Ref<any> = ref(15)
    const currentTime: Ref<any> = ref(workDuration.value)
    const currentSession: Ref<any> = ref(4)

    function setActiveCategory(category: CategoryItem) {
        activeCategory.value = category
    }

    function setWorkDuration(duration: number) {
        workDuration.value = duration
    }

    function setLongBreakDuration(duration: number) {
        longBreakDuration.value = duration
    }

    function setShortBreakDuration(duration: number) {
        shortBreakDuration.value = duration
    }

    function setSessionRounds(rounds: number) {
        sessionRounds.value = rounds
    }

    function addCategory(category: CategoryItem) {
        categories.value.push(category)
    }


    return {
        categories, activeCategory, sessionRounds, workDuration, longBreakDuration, shortBreakDuration, currentTime, currentSession,
        addCategory,
        setActiveCategory,
        setWorkDuration,
        setLongBreakDuration,
        setShortBreakDuration,
        setSessionRounds,
    }
})
