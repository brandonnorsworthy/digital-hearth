import { api } from './api'
import type { Household, Member, User } from '../types/api'

export const householdService = {
  get: (id: string) =>
    api.get<Household>(`/households/${id}`),

  update: (id: string, data: Partial<Pick<Household, 'name' | 'weekResetDay' | 'goalMealsPerWeek'>>) =>
    api.put<Household>(`/households/${id}`, data),

  members: (id: string) =>
    api.get<Member[]>(`/households/${id}/members`),

  create: (data: { householdName: string; username: string; pin: string; weekResetDay?: string }) =>
    api.post<{ user: User; household: Household }>('/households', data),

  join: (data: { username: string; pin: string; joinCode: string }) =>
    api.post<{ user: User; household: Household }>('/households/join', data),
}
