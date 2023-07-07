import type { CategoryItem } from "@/types/types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { EMOJIS } from "@/types/constatns";

export const usePomoStore = defineStore("pomo", () => {
    const categories: Ref<CategoryItem[]> = ref([{
        id: 1,
        name: "Uncategorized",
        color: "#000000"
    }])
    const activeCategory: Ref<CategoryItem | null> = ref(categories.value[0])
    const sessionRounds: Ref<any> = ref(4)
    const workDuration: Ref<any> = ref(45)
    const longBreakDuration: Ref<any> = ref(60)
    const shortBreakDuration: Ref<any> = ref(15)
    const currentTime: Ref<any> = ref(`${workDuration.value.toString().padStart(2, '0')}:00`)
    const counter: Ref<any> = ref(workDuration.value * 60)
    const isAutoStart: Ref<Boolean> = ref(true)
    const longBreakAfter: Ref<any> = ref(4)
    const isWorking: Ref<Boolean> = ref(true)
    const isPaused: Ref<Boolean> = ref(true)
    const currentRound: Ref<any> = ref(1)
    const timerStartInterval: Ref<any> = ref(undefined)

    function startTimer() {
        isPaused.value = false
        if (timerStartInterval.value) return
        timerStartInterval.value = setInterval(() => {
            if (counter.value === 0) {
                // notify user
                if (isWorking.value) {
                    new Notification("Break Started")
                } else {
                    new Notification("Break Ended")
                }
                // move to next round
                // check if long or short break duration  
                isWorking.value = !isWorking.value;
                counter.value = isWorking.value ? workDuration.value * 60 : shortBreakDuration.value * 60;
                if (!isAutoStart.value) {
                    pauseTimer()
                }
            }
            const minutes = Math.floor(counter.value / 60);
            const seconds = counter.value % 60;
            currentTime.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} `
            document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} | ${isWorking.value ? EMOJIS.WORK_DURATION : EMOJIS.BREAK_DURATION} ${activeCategory.value?.name}  `
            counter.value--;
        }, 1000)
    }

    function pauseTimer() {
        isPaused.value = true
        clearInterval(timerStartInterval.value)
        timerStartInterval.value = undefined
    }

    function resetTimer() {
        isPaused.value = true
        if (isWorking.value) {
            counter.value = workDuration.value * 60
            currentTime.value = `${workDuration.value.toString().padStart(2, '0')}:00`
        } else {
            counter.value = shortBreakDuration.value * 60
            currentTime.value = `${shortBreakDuration.value.toString().padStart(2, '0')}:00`
        }
        clearInterval(timerStartInterval.value)
        timerStartInterval.value = undefined
    }

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

    function setLongBreakAfter(value: number) {
        longBreakAfter.value = value
    }

    function setIsAutoStart(value: boolean) {
        isAutoStart.value = value
    }

    function editCategory(category: CategoryItem) {
        const index = categories.value.findIndex(cat => cat.id == category.id)
        if (index < 0) return
        categories.value[index] = category
        if (activeCategory.value && category.id == activeCategory.value.id) {
            activeCategory.value = category
        }
    }


    function getCounterProgress(): number {
        if (isWorking.value) {
            return ~~((counter.value / (workDuration.value * 60)) * 100)
        }
        return ~~((counter.value / (shortBreakDuration.value * 60)) * 100)
    }


    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    return {
        categories, activeCategory, sessionRounds, workDuration, longBreakDuration, shortBreakDuration, currentTime, currentRound,
        counter,
        isAutoStart,
        longBreakAfter,
        isPaused,
        isWorking,
        startTimer,
        pauseTimer,
        resetTimer,
        addCategory,
        editCategory,
        setActiveCategory,
        setWorkDuration,
        setLongBreakDuration,
        setShortBreakDuration,
        setSessionRounds,
        setLongBreakAfter,
        setIsAutoStart,
        getCounterProgress
    }
})
