import { describe, it, expect, vi, afterEach } from 'vitest'
import { mealService } from '../../services/meals'

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

describe('mealService.weeklyList', () => {
  it('calls GET /households/:id/meals/weekly', async () => {
    mockFetch(200, [])
    await mealService.weeklyList(1)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1/meals/weekly'),
      expect.anything(),
    )
  })

  it('appends weekOf query param when provided', async () => {
    mockFetch(200, [])
    await mealService.weeklyList(1, '2026-03-23')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('weekOf=2026-03-23'),
      expect.anything(),
    )
  })
})

describe('mealService.addWeekly', () => {
  it('calls POST /households/:id/meals/weekly', async () => {
    mockFetch(201, { id: 1, name: 'Pasta', weekOf: '2026-03-23' })
    await mealService.addWeekly(1, { weekOf: '2026-03-23', name: 'Pasta' })
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1/meals/weekly'),
      expect.objectContaining({ method: 'POST' }),
    )
  })
})

describe('mealService.removeWeekly', () => {
  it('calls DELETE /meals/weekly/:id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ status: 204, ok: true, json: () => Promise.resolve(null) }),
    )
    await mealService.removeWeekly(5)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/meals/weekly/5'),
      expect.objectContaining({ method: 'DELETE' }),
    )
  })
})

describe('mealService.library', () => {
  it('calls GET /households/:id/meals/library', async () => {
    mockFetch(200, [])
    await mealService.library(1)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1/meals/library'),
      expect.anything(),
    )
  })
})

describe('mealService.addToLibrary', () => {
  it('calls POST /households/:id/meals/library with name and tags', async () => {
    mockFetch(201, { id: 10, name: 'Chicken Curry' })
    await mealService.addToLibrary(1, 'Chicken Curry', ['dinner'])
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1/meals/library'),
      expect.objectContaining({ method: 'POST' }),
    )
    const body = JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)
    expect(body).toEqual({ name: 'Chicken Curry', tags: ['dinner'] })
  })
})

describe('mealService.removeFromLibrary', () => {
  it('calls DELETE /meals/library/:id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ status: 204, ok: true, json: () => Promise.resolve(null) }),
    )
    await mealService.removeFromLibrary(3)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/meals/library/3'),
      expect.objectContaining({ method: 'DELETE' }),
    )
  })
})

describe('mealService.favoriteMeal', () => {
  it('calls POST /meals/library/:id/favorite', async () => {
    mockFetch(204, null)
    await mealService.favoriteMeal(7)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/meals/library/7/favorite'),
      expect.objectContaining({ method: 'POST' }),
    )
  })
})

describe('mealService.unfavoriteMeal', () => {
  it('calls DELETE /meals/library/:id/favorite', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ status: 204, ok: true, json: () => Promise.resolve(null) }),
    )
    await mealService.unfavoriteMeal(7)
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/meals/library/7/favorite'),
      expect.objectContaining({ method: 'DELETE' }),
    )
  })
})

