


export interface CategoryItem {
    id: string
    color: string
    name: string
    isDeleted: boolean
}


export interface RoundItem {
    id: string
    color: string
    order: number
    isSkipped: boolean
    isBreak: boolean
    startDate?: number
    endDate?: number
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