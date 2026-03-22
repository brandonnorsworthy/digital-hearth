import { api } from './api'
import type { Task, Completion, TaskTier } from '../types/api'

export const taskService = {
  list: (householdId: number) =>
    api.get<Task[]>(`/households/${householdId}/tasks`),

  create: (householdId: number, data: { name: string; tier: TaskTier; intervalDays: number }) =>
    api.post<Task>(`/households/${householdId}/tasks`, data),

  update: (id: number, data: Partial<{ name: string; tier: TaskTier; intervalDays: number }>) =>
    api.put<Task>(`/tasks/${id}`, data),

  delete: (id: number) =>
    api.delete(`/tasks/${id}`),

  complete: (id: number) =>
    api.post<Task>(`/tasks/${id}/complete`),

  history: (id: number) =>
    api.get<Completion[]>(`/tasks/${id}/history`),
}
