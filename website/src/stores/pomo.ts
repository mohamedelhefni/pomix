import type { CategoryItem, RoundItem, SessionItem } from "@/types/types";
import { defineStore } from "pinia";
import { ref, watch, type Ref } from "vue";
import { EMOJIS } from "@/types/constatns";
import { UUID } from "@/utils/uuid";

export const usePomoStore = defineStore("pomo", () => {
    const categories: Ref<CategoryItem[]> = ref([{
        id: UUID(),
        name: "Uncategorized",
        color: "#000000",
        isDeleted: false
    }])
    const activeCategory: Ref<CategoryItem | undefined> = ref(categories.value[0])
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
    const currentRound: Ref<RoundItem> = ref({ id: UUID(), color: activeCategory.value?.color || "#000000", order: 1, categoryId: activeCategory.value?.id, isSkipped: false, isBreak: false })
    const timerStartInterval: Ref<any> = ref(undefined)
    const sessions: Ref<SessionItem[]> = ref([{ id: UUID(), rounds: [] }])
    const currentSession: Ref<SessionItem> = ref(sessions.value[0])
    const pomoCounter: Ref<number> = ref(0)
    const breakDuration: Ref<number> = ref(shortBreakDuration.value)


    watch(pomoCounter, (state) => {
        breakDuration.value = ((state % longBreakAfter.value) == 0) ? longBreakDuration.value : shortBreakDuration.value
    }, { deep: true })

    function newRound(skip: boolean) {
        return {
            id: UUID(),
            color: activeCategory.value?.color || '#000',
            isSkipped: skip,
            isBreak: !isWorking.value,
            categoryId: activeCategory.value?.id,
            order: currentSession.value.rounds.length + 1,
            startDate: Date.now()
        }
    }

    function startNewSession() {
        // if current session rounds is equal to session rounds start new session 
        // start new session
        currentSession.value.endDate = Date.now()
        sessions.value.push(currentSession.value)
        currentSession.value = {
            id: UUID(),
            rounds: [],
            startDate: Date.now()
        }

    }

    function startTimer(skip: boolean = false) {
        isPaused.value = false
        if (timerStartInterval.value) return

        timerStartInterval.value = setInterval(() => {
            if (counter.value === 0) {

                currentRound.value = newRound(skip)
                currentSession.value.rounds.push(currentRound.value)

                if (currentSession.value.rounds.length >= (sessionRounds.value)) {
                    startNewSession()
                }


                if (isWorking.value) {
                    pomoCounter.value++
                }

                breakDuration.value = ((pomoCounter.value % longBreakAfter.value) == 0) ? longBreakDuration.value : shortBreakDuration.value

                if (isWorking.value) {
                    new Notification(`You have ${breakDuration.value} mintues before next pomodoro`)
                } else {
                    new Notification("Break Ended it's time to start working on " + activeCategory.value?.name)
                }

                isWorking.value = !isWorking.value;
                counter.value = isWorking.value ? workDuration.value * 60 : breakDuration.value * 60;
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
            counter.value = breakDuration.value * 60
            currentTime.value = `${breakDuration.value.toString().padStart(2, '0')}:00`
        }
        clearInterval(timerStartInterval.value)
        timerStartInterval.value = undefined
    }

    function skipRound() {
        counter.value = 0
        currentTime.value = `00:00`
        clearInterval(timerStartInterval.value)
        timerStartInterval.value = undefined
        startTimer(true)
    }

    function setActiveCategory(category: CategoryItem) {
        activeCategory.value = category
    }

    function setWorkDuration(duration: number) {
        workDuration.value = duration
        counter.value = workDuration.value * 60
        currentTime.value = `${workDuration.value.toString().padStart(2, '0')}:00`
    }

    function setLongBreakDuration(duration: number) {
        longBreakDuration.value = duration
    }

    function setShortBreakDuration(duration: number) {
        shortBreakDuration.value = duration
    }

    function setSessionRounds(rounds: number) {
        sessionRounds.value = rounds
        if (currentSession.value.rounds.length >= (sessionRounds.value)) {
            startNewSession()
        }
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

    function deleteCategory(category: CategoryItem) {
        const index = categories.value.findIndex(cat => cat.id == category.id)
        if (index < 0) return
        categories.value[index].isDeleted = true
        activeCategory.value = categories.value[0]
    }


    function getCounterProgress(): number {
        if (isWorking.value) {
            return ~~((counter.value / (workDuration.value * 60)) * 100)
        }
        return ~~((counter.value / (breakDuration.value * 60)) * 100)
    }


    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    return {
        sessions, currentSession, categories, activeCategory, sessionRounds, workDuration, longBreakDuration, shortBreakDuration, currentTime, currentRound,
        counter,
        isAutoStart,
        longBreakAfter,
        isPaused,
        isWorking,
        pomoCounter,
        startTimer,
        pauseTimer,
        resetTimer,
        skipRound,
        addCategory,
        editCategory,
        deleteCategory,
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
