import { describe, it, expect, vi, afterEach } from 'vitest'
import { householdService } from '../../services/household'

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

describe('householdService.get', () => {
  it('calls GET /households/:id', async () => {
    mockFetch(200, { id: '1', name: 'The Smiths', joinCode: 'ABC', weekResetDay: 'Monday' })
    await householdService.get('1')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1'),
      expect.anything(),
    )
  })

  it('returns the household object', async () => {
    const household = { id: '1', name: 'The Smiths', joinCode: 'ABC', weekResetDay: 'Monday' }
    mockFetch(200, household)
    const result = await householdService.get('1')
    expect(result).toEqual(household)
  })
})

describe('householdService.update', () => {
  it('calls PUT /households/:id', async () => {
    mockFetch(200, { id: '1', name: 'The Smiths', joinCode: 'ABC', weekResetDay: 'Tuesday' })
    await householdService.update('1', { weekResetDay: 'Tuesday' })
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1'),
      expect.objectContaining({ method: 'PUT' }),
    )
  })
})

describe('householdService.members', () => {
  it('calls GET /households/:id/members', async () => {
    mockFetch(200, [])
    await householdService.members('1')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1/members'),
      expect.anything(),
    )
  })
})

describe('householdService.create', () => {
  it('calls POST /households with the creation data', async () => {
    mockFetch(201, { user: {}, household: {} })
    await householdService.create({ householdName: 'Test', username: 'Alice', pin: '0000' })
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households'),
      expect.objectContaining({ method: 'POST' }),
    )
  })
})

describe('householdService.join', () => {
  it('calls POST /households/join', async () => {
    mockFetch(200, { user: {}, household: {} })
    await householdService.join({ username: 'Bob', pin: '1234', joinCode: 'XYZ' })
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/join'),
      expect.objectContaining({ method: 'POST' }),
    )
  })
})
