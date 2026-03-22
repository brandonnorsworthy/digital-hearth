import type { DueBadgeVariant } from '../utils/task'

export default function DueBadge({ variant, label }: { variant: DueBadgeVariant; label: string }) {
  if (variant === 'urgent') {
    return (
      <span className="text-xs font-bold text-primary bg-primary-container px-2 py-1 rounded-full">
        {label}
      </span>
    )
  }
  if (variant === 'soon') {
    return (
      <span className="text-xs font-bold text-tertiary bg-tertiary-container/20 px-2 py-1 rounded-full">
        {label}
      </span>
    )
  }
  return (
    <span className="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded-full">
      {label}
    </span>
  )
}
