import type { Task } from '../types/api'

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
