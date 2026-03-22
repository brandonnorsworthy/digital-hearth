import { api } from './api'

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

  preferences: (householdId: number) =>
    api.get<{ optedOutTaskIds: number[] }>(`/households/${householdId}/notifications/preferences`),

  optOut: (taskId: number) =>
    api.post<void>('/notifications/preferences/opt-out', { taskId }),

  optIn: (taskId: number) =>
    api.delete(`/notifications/preferences/opt-out/${taskId}`),
}
