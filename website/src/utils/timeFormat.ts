/**
 * Format minutes into human-friendly string
 * @param minutes - Total minutes
 * @returns Formatted string like "2h 30m" or "45m"
 */
export function formatDuration(minutes: number): string {
    if (minutes < 1) return '0m'
    
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    
    if (hours === 0) {
        return `${mins}m`
    }
    
    if (mins === 0) {
        return `${hours}h`
    }
    
    return `${hours}h ${mins}m`
}

/**
 * Format minutes into detailed human-friendly string
 * @param minutes - Total minutes
 * @returns Formatted string like "2 hours 30 minutes"
 */
export function formatDurationLong(minutes: number): string {
    if (minutes < 1) return '0 minutes'
    
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    
    const hourStr = hours === 1 ? 'hour' : 'hours'
    const minStr = mins === 1 ? 'minute' : 'minutes'
    
    if (hours === 0) {
        return `${mins} ${minStr}`
    }
    
    if (mins === 0) {
        return `${hours} ${hourStr}`
    }
    
    return `${hours} ${hourStr} ${mins} ${minStr}`
}

/**
 * Get a productivity insight message based on the data
 */
export function getProductivityInsight(totalMinutes: number, sessionsCount: number, roundsCount: number): string {
    if (roundsCount === 0) {
        return "Start your first pomodoro to see insights!"
    }
    
    const avgMinutesPerSession = sessionsCount > 0 ? totalMinutes / sessionsCount : 0
    const avgRoundsPerSession = sessionsCount > 0 ? roundsCount / sessionsCount : 0
    
    if (totalMinutes >= 480) { // 8+ hours
        return "Incredible focus! You've put in a full workday of deep work."
    } else if (totalMinutes >= 240) { // 4+ hours
        return "Great productivity! You're building strong focus habits."
    } else if (totalMinutes >= 120) { // 2+ hours
        return "Good progress! Keep building your focus momentum."
    } else if (totalMinutes >= 60) {
        return "Nice start! Every pomodoro counts toward your goals."
    }
    
    return "Keep going! Consistency is key to productivity."
}
