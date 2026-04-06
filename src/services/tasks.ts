import { api } from './api'
import type { Task, Completion, TaskTier } from '../types/api'

export const taskService = {
  list: (householdId: string) =>
    api.get<Task[]>(`/households/${householdId}/tasks`),

  create: (householdId: string, data: { name: string; tier: TaskTier; intervalDays: number; isOneTime?: boolean }) =>
    api.post<Task>(`/households/${householdId}/tasks`, data),

  update: (id: string, data: Partial<{ name: string; tier: TaskTier; intervalDays: number; isOneTime: boolean }>) =>
    api.put<Task>(`/tasks/${id}`, data),

  delete: (id: string) =>
    api.delete(`/tasks/${id}`),

  complete: (id: string) =>
    api.post<Task>(`/tasks/${id}/complete`),

  history: (id: string) =>
    api.get<Completion[]>(`/tasks/${id}/history`),
}
