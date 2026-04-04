import { useNavigate } from 'react-router-dom'
import DueBadge from './DueBadge'
import { getDueBadge, formatCompletedAt } from '../utils/task'
import { daysToLabel } from '../utils/intervals'
import type { Task } from '../types/api'

export default function MediumTaskCard({ task, onComplete, completing }: { task: Task; onComplete: () => void; completing: boolean }) {
  const navigate = useNavigate()
  const { variant, label } = getDueBadge(task)
  return (
    <div
      className={`p-6 rounded-xl border border-outline-variant/10 transition-colors relative ${completing ? 'bg-surface-container opacity-60' : 'bg-surface-container-low cursor-pointer active:bg-surface-container-high'}`}
      onClick={completing ? undefined : () => navigate(`/tasks/${task.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-headline font-bold text-lg text-on-surface">{task.name}</h3>
          <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            Every {daysToLabel(task.intervalDays)}
          </p>
        </div>
        {!completing && (
          <div className="text-right shrink-0">
            <DueBadge variant={variant} label={label} />
          </div>
        )}
      </div>
      {task.lastCompletedAt && !completing && (
        <div className="flex items-center gap-3 text-sm text-on-surface-variant mb-6 italic">
          <span className="material-symbols-outlined text-sm">history</span>
          Last: {formatCompletedAt(task.lastCompletedAt)}{task.lastCompletedBy ? ` by ${task.lastCompletedBy}` : ''}
        </div>
      )}
      <button
        onClick={e => { e.stopPropagation(); if (!completing) onComplete() }}
        disabled={completing}
        className={`w-full py-3 rounded-xl font-headline font-bold flex items-center justify-center gap-2 transition-transform ${completing ? 'bg-surface-container-high text-on-surface-variant' : 'border-2 border-primary text-primary active:scale-95 hover:bg-primary/5'}`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          {completing ? 'check_circle' : 'task_alt'}
        </span>
        {completing ? 'Completed' : 'Mark Done'}
      </button>
    </div>
  )
}
