export interface CategoryItem {
    id: string
    color: string
    name: string
}


export interface RoundItem {
    id: string
    color: string
    order: number
    isSkipped: boolean
    isBreak: boolean
    startDate?: Date
    endDate?: Date
    duration?: number
    categoryId: string | undefined
    category?: CategoryItem | undefined
}

export interface SessionItem {
    id: string
    rounds: RoundItem[]
    startDate?: number
    endDate?: number
}