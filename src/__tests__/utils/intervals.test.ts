import { describe, it, expect } from 'vitest'
import { daysToLabel, labelToDays } from '../../utils/intervals'

describe('daysToLabel', () => {
  it('maps known day counts to labels', () => {
    expect(daysToLabel(3)).toBe('3 Days')
    expect(daysToLabel(7)).toBe('1 Week')
    expect(daysToLabel(14)).toBe('2 Weeks')
    expect(daysToLabel(30)).toBe('1 Month')
    expect(daysToLabel(90)).toBe('3 Months')
    expect(daysToLabel(180)).toBe('6 Months')
    expect(daysToLabel(365)).toBe('1 Year')
  })

  it('falls back to "<n> Days" for unknown values', () => {
    expect(daysToLabel(99)).toBe('99 Days')
    expect(daysToLabel(1)).toBe('1 Days')
  })
})

describe('labelToDays', () => {
  it('maps known labels to day counts', () => {
    expect(labelToDays('1 Week')).toBe(7)
    expect(labelToDays('1 Month')).toBe(30)
    expect(labelToDays('6 Months')).toBe(180)
    expect(labelToDays('1 Year')).toBe(365)
  })

  it('falls back to 7 for unknown labels', () => {
    expect(labelToDays('unknown label')).toBe(7)
    expect(labelToDays('')).toBe(7)
  })

  it('round-trips with daysToLabel', () => {
    expect(labelToDays(daysToLabel(90))).toBe(90)
    expect(labelToDays(daysToLabel(180))).toBe(180)
  })
})
