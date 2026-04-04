/** Returns the ISO date string (YYYY-MM-DD) for the Monday of the current week. */
export function getCurrentWeekOf(): string {
  const now = new Date()
  const diff = (now.getDay() + 6) % 7 // days since Monday (Mon=0 … Sun=6)
  const monday = new Date(now)
  monday.setDate(now.getDate() - diff)
  monday.setHours(0, 0, 0, 0)
  return monday.toISOString().split('T')[0]
}

/** Returns a new weekOf string shifted by n weeks from the given weekOf. */
export function shiftWeek(weekOf: string, n: number): string {
  const date = new Date(weekOf + 'T00:00:00')
  date.setDate(date.getDate() + n * 7)
  return date.toISOString().split('T')[0]
}

/** Returns a formatted date range string for the week starting on weekOf (Monday). */
export function formatWeekRange(weekOf: string): string {
  const start = new Date(weekOf + 'T00:00:00')
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${fmt(start)} — ${fmt(end)}`
}
