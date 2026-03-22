import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getDueBadge, getProgress } from '../../utils/task'
import type { Task } from '../../types/api'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 1,
    householdId: 1,
    name: 'Test Task',
    tier: 'short',
    intervalDays: 7,
    lastCompletedAt: null,
    lastCompletedBy: null,
    nextDueAt: new Date().toISOString(),
    ...overrides,
  }
}

// Pin clock to a fixed point: 2026-03-16T12:00:00Z (Monday noon UTC)
const FIXED_NOW = new Date('2026-03-16T12:00:00Z')

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(FIXED_NOW)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('getDueBadge', () => {
  it('returns urgent when the task is overdue', () => {
    const task = makeTask({ nextDueAt: new Date('2026-03-15T00:00:00Z').toISOString() })
    const { variant, label } = getDueBadge(task)
    expect(variant).toBe('urgent')
    expect(label).toBe('Due Today')
  })

  it('returns urgent when the task is due exactly now', () => {
    const task = makeTask({ nextDueAt: FIXED_NOW.toISOString() })
    const { variant } = getDueBadge(task)
    expect(variant).toBe('urgent')
  })

  it('returns soon when due within 3 days', () => {
    const task = makeTask({ nextDueAt: new Date('2026-03-18T12:00:00Z').toISOString() })
    const { variant, label } = getDueBadge(task)
    expect(variant).toBe('soon')
    expect(label).toBe('Due in 2d')
  })

  it('returns ok when due more than 3 days away', () => {
    const task = makeTask({ nextDueAt: new Date('2026-03-26T12:00:00Z').toISOString() })
    const { variant, label } = getDueBadge(task)
    expect(variant).toBe('ok')
    expect(label).toBe('10d Left')
  })
})

describe('getProgress', () => {
  it('returns ~0 when just completed (start ≈ now)', () => {
    const task = makeTask({
      lastCompletedAt: FIXED_NOW.toISOString(),
      nextDueAt: new Date(FIXED_NOW.getTime() + 7 * 86_400_000).toISOString(),
      intervalDays: 7,
    })
    expect(getProgress(task)).toBe(0)
  })

  it('returns 100 when the due date is now or past', () => {
    const task = makeTask({
      lastCompletedAt: new Date(FIXED_NOW.getTime() - 7 * 86_400_000).toISOString(),
      nextDueAt: FIXED_NOW.toISOString(),
      intervalDays: 7,
    })
    expect(getProgress(task)).toBe(100)
  })

  it('returns approximately 50 at the midpoint', () => {
    const start = new Date(FIXED_NOW.getTime() - 3.5 * 86_400_000)
    const due = new Date(FIXED_NOW.getTime() + 3.5 * 86_400_000)
    const task = makeTask({
      lastCompletedAt: start.toISOString(),
      nextDueAt: due.toISOString(),
      intervalDays: 7,
    })
    expect(getProgress(task)).toBe(50)
  })

  it('clamps to 0 minimum', () => {
    // completed far in the future, due even further — negative elapsed
    const task = makeTask({
      lastCompletedAt: new Date(FIXED_NOW.getTime() + 1 * 86_400_000).toISOString(),
      nextDueAt: new Date(FIXED_NOW.getTime() + 8 * 86_400_000).toISOString(),
      intervalDays: 7,
    })
    expect(getProgress(task)).toBe(0)
  })

  it('clamps to 100 maximum', () => {
    // overdue by a week
    const task = makeTask({
      lastCompletedAt: new Date(FIXED_NOW.getTime() - 14 * 86_400_000).toISOString(),
      nextDueAt: new Date(FIXED_NOW.getTime() - 7 * 86_400_000).toISOString(),
      intervalDays: 7,
    })
    expect(getProgress(task)).toBe(100)
  })

  it('infers start from intervalDays when lastCompletedAt is null', () => {
    const due = new Date(FIXED_NOW.getTime() + 3.5 * 86_400_000)
    const task = makeTask({
      lastCompletedAt: null,
      nextDueAt: due.toISOString(),
      intervalDays: 7,
    })
    // start inferred as due - 7d = now - 3.5d → 50% elapsed
    expect(getProgress(task)).toBe(50)
  })
})
