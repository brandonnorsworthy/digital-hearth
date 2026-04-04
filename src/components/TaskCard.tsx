import DueBadge from './DueBadge'
import { getDueBadge } from '../utils/task'
import { daysToLabel } from '../utils/intervals'
import type { Task } from '../types/api'

export default function TaskCard({ task, onComplete, completing }: { task: Task; onComplete: () => void; completing: boolean }) {
  const { variant, label } = getDueBadge(task)
  return (
    <div
      className={`p-6 rounded-xl shadow-sm border border-outline-variant/5 transition-colors relative ${completing ? 'bg-surface-container opacity-60' : 'bg-surface-container-lowest'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-headline font-bold text-lg text-on-surface">{task.name}</h3>
          <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-sm">event_repeat</span>
            Every {daysToLabel(task.intervalDays)}
          </p>
        </div>
        {!completing && (
          <div className="text-right shrink-0">
            <DueBadge variant={variant} label={label} />
          </div>
        )}
      </div>
      <button
        onClick={e => { e.stopPropagation(); if (!completing) onComplete() }}
        disabled={completing}
        className={`w-full py-3.5 rounded-xl font-headline font-bold flex items-center justify-center gap-2 transition-transform ${completing ? 'bg-surface-container-high text-on-surface-variant' : 'bg-linear-to-r from-primary to-primary-dim text-on-primary active:scale-95'}`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        {completing ? 'Completed' : 'Complete Task'}
      </button>
    </div>
  )
}
