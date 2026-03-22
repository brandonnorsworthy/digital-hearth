const INTERVAL_MAP: { label: string; days: number }[] = [
  { label: '3 Days', days: 3 },
  { label: '1 Week', days: 7 },
  { label: '2 Weeks', days: 14 },
  { label: '1 Month', days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
  { label: '1 Year', days: 365 },
]

export const INTERVAL_LABELS = INTERVAL_MAP.map(i => i.label)

export function daysToLabel(days: number): string {
  return INTERVAL_MAP.find(i => i.days === days)?.label ?? `${days} Days`
}

export function labelToDays(label: string): number {
  return INTERVAL_MAP.find(i => i.label === label)?.days ?? 7
}
