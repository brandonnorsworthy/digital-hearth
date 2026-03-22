/** Returns the ISO date string (YYYY-MM-DD) for the Monday of the current week. */
export function getCurrentWeekOf(): string {
  const now = new Date()
  const diff = (now.getDay() + 6) % 7 // days since Monday (Mon=0 … Sun=6)
  const monday = new Date(now)
  monday.setDate(now.getDate() - diff)
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString().split('T')[0]
}
