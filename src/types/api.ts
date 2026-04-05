export type TaskTier = 'short' | 'medium' | 'long'

export interface User {
  id: string
  username: string
  householdId: string
}

export interface Household {
  id: string
  name: string
  joinCode: string
  joinCodeExpiresAt: string
  weekResetDay: string
  goalMealsPerWeek: number | null
  monthlyImageBudget: number | null
  imageGenThisMonth: number
}

export interface Member {
  id: string
  username: string
  role: 'admin' | 'member'
}

export interface Task {
  id: string
  householdId: string
  name: string
  intervalDays: number
  lastCompletedAt: string | null
  lastCompletedBy: string | null
  nextDueAt: string
}

export interface Completion {
  id: string
  taskId: string
  completedAt: string
  userId: string
  username: string
}

export interface WeeklyMeal {
  id: string
  weekOf: string
  name: string
  mealLibraryId: string | null
  isFromLibrary: boolean
  hasImage: boolean
  imageGuid: string | null
}

export interface LibraryMeal {
  id: string
  name: string
  createdBy: string
  createdAt: string
  tags: string[]
  hasImage: boolean
  isFavorited: boolean
  imageGuid: string | null
}
