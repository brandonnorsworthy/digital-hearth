import { QUIET_PHRASES, BUSY_PHRASES_ONE, BUSY_PHRASES_MANY } from '../constants/dashboard'

export function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function getHeadline(pendingCount: number) {
  const seed = Math.floor(Date.now() / (1000 * 60 * 60 * 4))
  if (pendingCount === 0) return QUIET_PHRASES[seed % QUIET_PHRASES.length]
  if (pendingCount === 1) return BUSY_PHRASES_ONE[seed % BUSY_PHRASES_ONE.length]
  return BUSY_PHRASES_MANY[seed % BUSY_PHRASES_MANY.length](pendingCount)
}
