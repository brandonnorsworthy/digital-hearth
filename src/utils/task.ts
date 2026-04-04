import type { Task, TaskTier } from '../types/api'

export function isTaskDone(task: Task): boolean {
  return task.lastCompletedAt !== null && new Date(task.nextDueAt) > new Date()
}

export type DueBadgeVariant = 'urgent' | 'soon' | 'ok'

export function getDueBadge(task: Task): { variant: DueBadgeVariant; label: string } {
  const now = new Date()
  const due = new Date(task.nextDueAt)
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return { variant: 'urgent', label: 'Due Today' }
  if (diffDays <= 3) return { variant: 'soon', label: `Due in ${diffDays}d` }
  return { variant: 'ok', label: `${diffDays}d Left` }
}

export function getProgress(task: Task): number {
  const now = new Date()
  const due = new Date(task.nextDueAt)
  const start = task.lastCompletedAt
    ? new Date(task.lastCompletedAt)
    : new Date(due.getTime() - task.intervalDays * 86_400_000)
  const total = due.getTime() - start.getTime()
  const elapsed = now.getTime() - start.getTime()
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)))
}

const TIER_ICONS: Record<string, string> = {
  short: 'bolt',
  medium: 'waves',
  long: 'auto_awesome_motion',
}

export function getTierIcon(tier: string): string {
  return TIER_ICONS[tier] ?? 'task_alt'
}

export function formatCompletedAt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getTierFromDays(intervalDays: number): TaskTier {
  if (intervalDays < 7) return 'short'
  if (intervalDays < 30) return 'medium'
  return 'long'
}

const TIER_VISIBILITY_DAYS: Record<TaskTier, number | null> = {
  short: null,   // always visible
  medium: 7,     // show when ≤ 7 days from due
  long: 30,      // show when ≤ 30 days from due
}

export function isTaskVisible(task: Task): boolean {
  const tier = getTierFromDays(task.intervalDays)
  const windowDays = TIER_VISIBILITY_DAYS[tier]
  if (windowDays === null) return true
  const daysUntilDue = Math.ceil((new Date(task.nextDueAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return daysUntilDue <= windowDays
}
