import { api } from './api'
import type { WeeklyMeal, LibraryMeal } from '../types/api'

export const mealService = {
  weeklyList: (householdId: number, weekOf?: string) => {
    const q = weekOf ? `?weekOf=${weekOf}` : ''
    return api.get<WeeklyMeal[]>(`/households/${householdId}/meals/weekly${q}`)
  },

  addWeekly: (
    householdId: number,
    data: { weekOf: string; mealLibraryId?: number; name?: string },
  ) => api.post<WeeklyMeal>(`/households/${householdId}/meals/weekly`, data),

  removeWeekly: (id: number) =>
    api.delete(`/meals/weekly/${id}`),

  library: (householdId: number) =>
    api.get<LibraryMeal[]>(`/households/${householdId}/meals/library`),

  addToLibrary: (householdId: number, name: string) =>
    api.post<LibraryMeal>(`/households/${householdId}/meals/library`, { name }),

  removeFromLibrary: (id: number) =>
    api.delete(`/meals/library/${id}`),
}
