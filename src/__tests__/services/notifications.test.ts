import { describe, it, expect, vi, afterEach } from 'vitest'
import { notificationService } from '../../services/notifications'

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: status >= 200 && status < 300,
      json: () => Promise.resolve(body),
    }),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('notificationService.vapidPublicKey', () => {
  it('calls GET /notifications/vapid-public-key', async () => {
    mockFetch(200, { publicKey: 'abc123' })
    await notificationService.vapidPublicKey()
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/notifications/vapid-public-key'),
      expect.anything(),
    )
  })

  it('returns the public key', async () => {
    mockFetch(200, { publicKey: 'my-vapid-key' })
    const result = await notificationService.vapidPublicKey()
    expect(result).toEqual({ publicKey: 'my-vapid-key' })
  })
})

describe('notificationService.subscribe', () => {
  it('calls POST /notifications/subscription with endpoint, p256dh, and auth', async () => {
    mockFetch(200, {})
    const sub: PushSubscriptionJSON = {
      endpoint: 'https://push.example.com/sub',
      keys: { p256dh: 'key1', auth: 'auth1' },
    }
    await notificationService.subscribe(sub)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/notifications/subscription'),
      expect.objectContaining({ method: 'POST' }),
    )
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual({ endpoint: 'https://push.example.com/sub', p256dh: 'key1', auth: 'auth1' })
  })
})

describe('notificationService.unsubscribe', () => {
  it('calls DELETE /notifications/subscription', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ status: 204, ok: true, json: () => Promise.resolve(null) }),
    )
    await notificationService.unsubscribe()
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/notifications/subscription'),
      expect.objectContaining({ method: 'DELETE' }),
    )
  })
})

describe('notificationService.getUserNotifSettings', () => {
  it('calls GET /notifications/settings', async () => {
    mockFetch(200, { taskReminderHour: null, mediumTermDaysAhead: null, mealPlannerNotifs: true, shortTermTaskNotifs: true, mediumTermTaskNotifs: true, longTermTaskNotifs: true, taskCompletedNotifs: false })
    await notificationService.getUserNotifSettings()
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/notifications/settings'),
      expect.anything(),
    )
  })

  it('returns the settings object', async () => {
    const settings = { taskReminderHour: 8, mediumTermDaysAhead: 3, mealPlannerNotifs: true, shortTermTaskNotifs: false, mediumTermTaskNotifs: true, longTermTaskNotifs: true, taskCompletedNotifs: true }
    mockFetch(200, settings)
    const result = await notificationService.getUserNotifSettings()
    expect(result).toEqual(settings)
  })
})

describe('notificationService.updateUserNotifSettings', () => {
  it('calls PUT /notifications/settings with the settings body', async () => {
    mockFetch(204, null)
    const settings = { taskReminderHour: 9, mediumTermDaysAhead: 2, mealPlannerNotifs: true, shortTermTaskNotifs: true, mediumTermTaskNotifs: false, longTermTaskNotifs: true, taskCompletedNotifs: false }
    await notificationService.updateUserNotifSettings(settings)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/notifications/settings'),
      expect.objectContaining({ method: 'PUT' }),
    )
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual(settings)
  })
})

describe('notificationService.preferences', () => {
  it('calls GET /households/:id/notifications/preferences', async () => {
    mockFetch(200, { optedOutTaskIds: [1, 2] })
    await notificationService.preferences(42)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/42/notifications/preferences'),
      expect.anything(),
    )
  })
})

describe('notificationService.optOut', () => {
  it('calls POST /notifications/preferences/opt-out with taskId', async () => {
    mockFetch(204, null)
    await notificationService.optOut(7)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/notifications/preferences/opt-out'),
      expect.objectContaining({ method: 'POST' }),
    )
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual({ taskId: 7 })
  })
})

describe('notificationService.optIn', () => {
  it('calls DELETE /notifications/preferences/opt-out/:taskId', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 204, ok: true, json: () => Promise.resolve(null) }))
    await notificationService.optIn(7)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/notifications/preferences/opt-out/7'),
      expect.objectContaining({ method: 'DELETE' }),
    )
  })
})
