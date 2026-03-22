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

  updateWeekly: (id: number, data: { mealLibraryId: number }) =>
    api.patch<WeeklyMeal>(`/meals/weekly/${id}`, data),

  removeWeekly: (id: number) =>
    api.delete(`/meals/weekly/${id}`),

  library: (householdId: number) =>
    api.get<LibraryMeal[]>(`/households/${householdId}/meals/library`),

  addToLibrary: (householdId: number, name: string, tags?: string[]) =>
    api.post<LibraryMeal>(`/households/${householdId}/meals/library`, { name, tags }),

  generateImage: (mealName: string) =>
    api.post<{ imageData: string }>('/meals/generate-image', { mealName }),

  removeFromLibrary: (id: number) =>
    api.delete(`/meals/library/${id}`),
}
