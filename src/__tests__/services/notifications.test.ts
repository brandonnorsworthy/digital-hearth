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
