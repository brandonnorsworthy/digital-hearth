import { api } from './api'

export interface UserNotifSettings {
  taskReminderHour: number | null
  mediumTermDaysAhead: number | null
  mealPlannerNotifs: boolean
  shortTermTaskNotifs: boolean
  mediumTermTaskNotifs: boolean
  longTermTaskNotifs: boolean
  taskCompletedNotifs: boolean
}

export const notificationService = {
  vapidPublicKey: () =>
    api.get<{ publicKey: string }>('/notifications/vapid-public-key'),

  subscribe: (subscription: PushSubscriptionJSON) =>
    api.post<void>('/notifications/subscription', {
      endpoint: subscription.endpoint,
      p256dh: subscription.keys?.p256dh,
      auth: subscription.keys?.auth,
    }),

  unsubscribe: () =>
    api.delete('/notifications/subscription'),

  preferences: (householdId: string) =>
    api.get<{ optedOutTaskIds: string[] }>(`/households/${householdId}/notifications/preferences`),

  optOut: (taskId: string) =>
    api.post<void>('/notifications/preferences/opt-out', { taskId }),

  optIn: (taskId: string) =>
    api.delete(`/notifications/preferences/opt-out/${taskId}`),

  getUserNotifSettings: () =>
    api.get<UserNotifSettings>('/notifications/settings'),

  updateUserNotifSettings: (settings: UserNotifSettings) =>
    api.put<void>('/notifications/settings', settings),
}
