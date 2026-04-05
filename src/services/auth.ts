import { api } from './api'
import type { User } from '../types/api'

export const authService = {
  login: (username: string, password: string) =>
    api.post<User>('/auth/login', { username, password }),

  logout: () =>
    api.post<void>('/auth/logout'),

  me: () =>
    api.get<User>('/auth/me'),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post<void>('/auth/change-password', { currentPassword, newPassword }),
}
