import { api } from './api'
import type { Household, Member, User } from '../types/api'

export const householdService = {
  get: (id: number) =>
    api.get<Household>(`/households/${id}`),

  update: (id: number, data: Partial<Pick<Household, 'name' | 'weekResetDay'>>) =>
    api.put<Household>(`/households/${id}`, data),

  members: (id: number) =>
    api.get<Member[]>(`/households/${id}/members`),

  create: (data: { householdName: string; username: string; pin: string; weekResetDay?: string }) =>
    api.post<{ user: User; household: Household }>('/households', data),

  join: (data: { username: string; pin: string; joinCode: string }) =>
    api.post<{ user: User; household: Household }>('/households/join', data),
}
