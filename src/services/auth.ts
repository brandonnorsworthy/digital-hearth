import { api } from './api'
import type { User } from '../types/api'

export const authService = {
  login: (username: string, pin: string) =>
    api.post<User>('/auth/login', { username, pin }),

  logout: () =>
    api.post<void>('/auth/logout'),

  me: () =>
    api.get<User>('/auth/me'),

  changePin: (currentPin: string, newPin: string) =>
    api.post<void>('/auth/change-pin', { currentPin, newPin }),
}
