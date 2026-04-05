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
    await authService.login('Sarah', 'TestPass1!abc')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('sends username and password in the request body', async () => {
    mockFetch(200, { id: 1, username: 'Sarah', householdId: 1 })
    await authService.login('Sarah', 'TestPass1!abc')
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual({ username: 'Sarah', password: 'TestPass1!abc' })
  })

  it('returns the user object on success', async () => {
    const user = { id: 1, username: 'Sarah', householdId: 1 }
    mockFetch(200, user)
    const result = await authService.login('Sarah', 'TestPass1!abc')
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

describe('authService.changePassword', () => {
  it('calls POST /auth/change-password', async () => {
    mockFetch(204, null)
    await authService.changePassword('TestPass1!abc', 'NewPass2!xyz')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/auth/change-password'),
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('sends currentPassword and newPassword in the request body', async () => {
    mockFetch(204, null)
    await authService.changePassword('TestPass1!abc', 'NewPass2!xyz')
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual({ currentPassword: 'TestPass1!abc', newPassword: 'NewPass2!xyz' })
  })

  it('throws when the server returns 401', async () => {
    mockFetch(401, { error: 'Current password is incorrect' })
    await expect(authService.changePassword('wrong', 'NewPass2!xyz')).rejects.toThrow()
  })
})
