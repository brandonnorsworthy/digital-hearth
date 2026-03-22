import { describe, it, expect, afterEach } from 'vitest'
import { getCurrentWeekOf } from '../../utils/meals'

describe('getCurrentWeekOf', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns a string in YYYY-MM-DD format', () => {
    const result = getCurrentWeekOf()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('always returns a Monday', () => {
    const result = getCurrentWeekOf()
    const day = new Date(result + 'T00:00:00').getDay()
    expect(day).toBe(1) // 1 = Monday
  })

  it('returns the same value when called twice in the same tick', () => {
    expect(getCurrentWeekOf()).toBe(getCurrentWeekOf())
  })

  it('returns the correct Monday for a known Wednesday', () => {
    // Wednesday 2026-03-18 → Monday should be 2026-03-16
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-18T12:00:00'))
    expect(getCurrentWeekOf()).toBe('2026-03-16')
  })

  it('returns itself when called on a Monday', () => {
    // Monday 2026-03-16
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-16T09:00:00'))
    expect(getCurrentWeekOf()).toBe('2026-03-16')
  })

  it('returns the correct Monday for a Sunday (end of week)', () => {
    // Sunday 2026-03-22 → Monday should be 2026-03-16
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-22T23:59:00'))
    expect(getCurrentWeekOf()).toBe('2026-03-16')
  })
})
