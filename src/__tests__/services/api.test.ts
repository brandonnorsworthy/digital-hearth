import { describe, it, expect, afterEach } from 'vitest'
import { ApiError, api } from '../../services/api'

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

describe('ApiError', () => {
  it('is an instance of Error', () => {
    const err = new ApiError(404, 'Not found')
    expect(err).toBeInstanceOf(Error)
  })

  it('is an instance of ApiError', () => {
    const err = new ApiError(404, 'Not found')
    expect(err).toBeInstanceOf(ApiError)
  })

  it('exposes status and message', () => {
    const err = new ApiError(401, 'Unauthorized')
    expect(err.status).toBe(401)
    expect(err.message).toBe('Unauthorized')
  })

  it('has name set to ApiError', () => {
    const err = new ApiError(500, 'Server error')
    expect(err.name).toBe('ApiError')
  })
})

describe('api.get', () => {
  it('resolves with parsed JSON on 200', async () => {
    mockFetch(200, { id: 1, name: 'Test' })
    const result = await api.get('/test')
    expect(result).toEqual({ id: 1, name: 'Test' })
  })

  it('throws ApiError with correct status on non-ok response', async () => {
    mockFetch(401, { error: 'Unauthorized' })
    await expect(api.get('/test')).rejects.toMatchObject({
      status: 401,
      message: 'Unauthorized',
    })
  })

  it('throws ApiError with "Unknown error" when error field is missing', async () => {
    mockFetch(500, {})
    await expect(api.get('/test')).rejects.toMatchObject({
      status: 500,
      message: 'Unknown error',
    })
  })
})

describe('api.post', () => {
  it('resolves with parsed JSON on 201', async () => {
    mockFetch(201, { id: 2 })
    const result = await api.post('/test', { name: 'New' })
    expect(result).toEqual({ id: 2 })
  })
})

describe('api.delete', () => {
  it('resolves with undefined on 204', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        status: 204,
        ok: true,
        json: () => Promise.resolve(null),
      }),
    )
    const result = await api.delete('/test/1')
    expect(result).toBeUndefined()
  })
})
