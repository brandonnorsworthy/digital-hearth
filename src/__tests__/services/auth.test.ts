import { describe, it, expect, vi, afterEach } from 'vitest'
import { authService } from '../../services/auth'

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: status >= 200 && status < 300,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve(body),
    }),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('authService.login', () => {
  it('calls POST /auth/login', async () => {
    mockFetch(200, { id: 1, username: 'Sarah', householdId: 1 })
    await authService.login('Sarah', '1234')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('sends username and pin in the request body', async () => {
    mockFetch(200, { id: 1, username: 'Sarah', householdId: 1 })
    await authService.login('Sarah', '1234')
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual({ username: 'Sarah', pin: '1234' })
  })

  it('returns the user object on success', async () => {
    const user = { id: 1, username: 'Sarah', householdId: 1 }
    mockFetch(200, user)
    const result = await authService.login('Sarah', '1234')
    expect(result).toEqual(user)
  })
})

describe('authService.logout', () => {
  it('calls POST /auth/logout', async () => {
    mockFetch(200, {})
    await authService.logout()
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/auth/logout'),
      expect.objectContaining({ method: 'POST' }),
    )
  })
})

describe('authService.me', () => {
  it('calls GET /auth/me', async () => {
    mockFetch(200, { id: 1, username: 'Sarah', householdId: 1 })
    await authService.me()
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/auth/me'),
      expect.anything(),
    )
  })

  it('returns the current user', async () => {
    const user = { id: 2, username: 'John', householdId: 1 }
    mockFetch(200, user)
    const result = await authService.me()
    expect(result).toEqual(user)
  })
})

describe('authService.changePin', () => {
  it('calls POST /auth/change-pin', async () => {
    mockFetch(204, null)
    await authService.changePin('1234', '5678')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/auth/change-pin'),
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('sends currentPin and newPin in the request body', async () => {
    mockFetch(204, null)
    await authService.changePin('1234', '5678')
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual({ currentPin: '1234', newPin: '5678' })
  })

  it('throws when the server returns 401', async () => {
    mockFetch(401, { error: 'Current PIN is incorrect' })
    await expect(authService.changePin('wrong', '5678')).rejects.toThrow()
  })
})
