import { api } from './api'
import type { WeeklyMeal, LibraryMeal } from '../types/api'

export const mealService = {
  weeklyList: (householdId: string, weekOf?: string) => {
    const q = weekOf ? `?weekOf=${weekOf}` : ''
    return api.get<WeeklyMeal[]>(`/households/${householdId}/meals/weekly${q}`)
  },

  addWeekly: (
    householdId: string,
    data: { weekOf: string; mealLibraryId?: string; name?: string },
  ) => api.post<WeeklyMeal>(`/households/${householdId}/meals/weekly`, data),

  updateWeekly: (id: string, data: { mealLibraryId: string }) =>
    api.patch<WeeklyMeal>(`/meals/weekly/${id}`, data),

  removeWeekly: (id: string) =>
    api.delete(`/meals/weekly/${id}`),

  markCooked: (id: string, isCooked: boolean) =>
    api.patch<WeeklyMeal>(`/meals/weekly/${id}/cooked`, { isCooked }),

  library: (householdId: string) =>
    api.get<LibraryMeal[]>(`/households/${householdId}/meals/library`),

  addToLibrary: (householdId: string, name: string, tags?: string[]) =>
    api.post<LibraryMeal>(`/households/${householdId}/meals/library`, { name, tags }),

  generateImage: (mealName: string) =>
    api.post<{ imageData: string }>('/meals/generate-image', { mealName }),

  removeFromLibrary: (id: string) =>
    api.delete(`/meals/library/${id}`),

  favoriteMeal: (id: string) =>
    api.post<void>(`/meals/library/${id}/favorite`, {}),

  unfavoriteMeal: (id: string) =>
    api.delete(`/meals/library/${id}/favorite`),

  regenerateImage: (id: string) =>
    api.post<string>(`/meals/library/${id}/regenerate-image`, {}),
}
