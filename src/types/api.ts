export type TaskTier = 'short' | 'medium' | 'long'

export interface User {
  id: number
  username: string
  householdId: number
}

export interface Household {
  id: number
  name: string
  joinCode: string
  weekResetDay: string
}

export interface Member {
  id: number
  username: string
  role: 'admin' | 'member'
}

export interface Task {
  id: number
  householdId: number
  name: string
  tier: TaskTier
  intervalDays: number
  lastCompletedAt: string | null
  lastCompletedBy: string | null
  nextDueAt: string
}

export interface Completion {
  id: number
  taskId: number
  completedAt: string
  userId: number
  username: string
}

export interface WeeklyMeal {
  id: number
  weekOf: string
  name: string
  mealLibraryId: number | null
  isFromLibrary: boolean
  imageUrl: string | null
}

export interface LibraryMeal {
  id: number
  name: string
  createdBy: string
  createdAt: string
  tags: string[]
  imageUrl: string | null
}
