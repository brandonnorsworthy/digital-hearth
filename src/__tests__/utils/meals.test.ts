import { describe, it, expect, afterEach } from 'vitest'
import { getCurrentWeekOf, shiftWeek, formatWeekRange } from '../../utils/meals'

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

describe('shiftWeek', () => {
  it('shifts forward by 1 week', () => {
    expect(shiftWeek('2026-03-16', 1)).toBe('2026-03-23')
  })

  it('shifts forward by 2 weeks', () => {
    expect(shiftWeek('2026-03-16', 2)).toBe('2026-03-30')
  })

  it('shifts backward by 1 week', () => {
    expect(shiftWeek('2026-03-16', -1)).toBe('2026-03-09')
  })

  it('returns the same date when shifted by 0', () => {
    expect(shiftWeek('2026-03-16', 0)).toBe('2026-03-16')
  })
})

describe('formatWeekRange', () => {
  it('returns a string with a dash separator', () => {
    expect(formatWeekRange('2026-03-16')).toContain('—')
  })

  it('includes the start date month and day', () => {
    expect(formatWeekRange('2026-03-16')).toContain('Mar 16')
  })

  it('ends on Sunday (6 days later)', () => {
    expect(formatWeekRange('2026-03-16')).toContain('Mar 22')
  })
})
