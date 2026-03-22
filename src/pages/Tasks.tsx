import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import { getDueBadge, getProgress, formatCompletedAt } from '../utils/task'
import { daysToLabel } from '../utils/intervals'
import type { Task } from '../types/api'
import type { DueBadgeVariant } from '../utils/task'

function DueBadge({ variant, label }: { variant: DueBadgeVariant; label: string }) {
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

function ProgressBar({ pct, variant }: { pct: number; variant: DueBadgeVariant }) {
  const barColor = variant === 'urgent' ? 'bg-error-container' : 'bg-primary'
  return (
    <div className="w-full bg-surface-container rounded-full h-1.5 mb-6 overflow-hidden">
      <div
        className={`${barColor} h-full transition-all`}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

function ShortTaskCard({ task, onComplete }: { task: Task; onComplete: () => void }) {
  const navigate = useNavigate()
  const { variant, label } = getDueBadge(task)
  const pct = getProgress(task)
  return (
    <div
      className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/5 cursor-pointer active:bg-surface-container-high transition-colors relative"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-headline font-bold text-lg text-on-surface">{task.name}</h3>
          <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-sm">event_repeat</span>
            Every {daysToLabel(task.intervalDays)}
          </p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant/30 mx-2">chevron_right</span>
        <div className="text-right shrink-0">
          <DueBadge variant={variant} label={label} />
        </div>
      </div>
      <ProgressBar pct={pct} variant={variant} />
      <button
        onClick={e => { e.stopPropagation(); onComplete() }}
        className="w-full bg-linear-to-r from-primary to-primary-dim text-on-primary py-3.5 rounded-xl font-headline font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        Complete Task
      </button>
    </div>
  )
}

function MediumTaskCard({ task, onComplete }: { task: Task; onComplete: () => void }) {
  const navigate = useNavigate()
  const { variant, label } = getDueBadge(task)
  return (
    <div
      className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 cursor-pointer active:bg-surface-container-high transition-colors relative"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-headline font-bold text-lg text-on-surface">{task.name}</h3>
          <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            Every {daysToLabel(task.intervalDays)}
          </p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant/30 mx-2">chevron_right</span>
        <div className="text-right shrink-0">
          <DueBadge variant={variant} label={label} />
        </div>
      </div>
      {task.lastCompletedAt && (
        <div className="flex items-center gap-3 text-sm text-on-surface-variant mb-6 italic">
          <span className="material-symbols-outlined text-sm">history</span>
          Last: {formatCompletedAt(task.lastCompletedAt)}{task.lastCompletedBy ? ` by ${task.lastCompletedBy}` : ''}
        </div>
      )}
      <button
        onClick={e => { e.stopPropagation(); onComplete() }}
        className="w-full border-2 border-primary text-primary py-3 rounded-xl font-headline font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary/5"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
        Mark Done
      </button>
    </div>
  )
}

export default function Tasks() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<Task[]>([])
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!user?.householdId) return
    taskService.list(user.householdId).then(setTasks).catch(console.error)
  }, [user?.householdId])

  async function complete(task: Task) {
    setCompletedIds(prev => new Set([...prev, task.id]))
    try {
      const updated = await taskService.complete(task.id)
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
      setCompletedIds(prev => {
        const next = new Set(prev)
        next.delete(task.id)
        return next
      })
    } catch {
      setCompletedIds(prev => {
        const next = new Set(prev)
        next.delete(task.id)
        return next
      })
    }
  }

  const visible = tasks.filter(t => !completedIds.has(t.id))
  const shortTasks = visible.filter(t => t.tier === 'short')
  const mediumTasks = visible.filter(t => t.tier === 'medium')
  const longTasks = visible.filter(t => t.tier === 'long')
  const totalPending = visible.length

  const [heroTask, secondTask] = longTasks

  return (
    <Layout showFab onFabClick={() => navigate('/tasks/new')}>
      <div className="pt-6 px-6 max-w-md mx-auto pb-4">

        {/* Glass nudge */}
        <div className="mb-10 p-5 rounded-xl flex items-center justify-between shadow-sm bg-secondary-container/80 backdrop-blur-xl border border-on-secondary-container/5">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-1">Weekly Pulse</span>
            <p className="font-headline font-bold text-lg text-on-surface">
              {totalPending} Task{totalPending !== 1 ? 's' : ''} Pending
            </p>
          </div>
          <div className="bg-primary-container text-on-primary-container rounded-full w-12 h-12 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
        </div>

        {/* Short — Weekly Rhythm */}
        {shortTasks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-6 ml-1">
              <h2 className="font-headline font-bold text-2xl text-on-surface">Weekly Rhythm</h2>
              <span className="text-sm font-medium text-on-surface-variant">Next 7 days</span>
            </div>
            <div className="space-y-6">
              {shortTasks.map(task => (
                <ShortTaskCard key={task.id} task={task} onComplete={() => complete(task)} />
              ))}
            </div>
          </section>
        )}

        {/* Medium — Monthly Care */}
        {mediumTasks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-6 ml-1">
              <h2 className="font-headline font-bold text-2xl text-on-surface">Monthly Care</h2>
              <span className="text-sm font-medium text-on-surface-variant">Every 30 days</span>
            </div>
            <div className="space-y-6">
              {mediumTasks.map(task => (
                <MediumTaskCard key={task.id} task={task} onComplete={() => complete(task)} />
              ))}
            </div>
          </section>
        )}

        {/* Long — Seasonal Anchor */}
        {longTasks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-6 ml-1">
              <h2 className="font-headline font-bold text-2xl text-on-surface">Seasonal Anchor</h2>
              <span className="text-sm font-medium text-on-surface-variant">Half-Yearly</span>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {heroTask && (
                <div
                  className="bg-primary-container/30 p-8 rounded-xl relative overflow-hidden group cursor-pointer active:scale-[0.99] transition-transform"
                  onClick={() => navigate(`/tasks/${heroTask.id}`)}
                >
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold mb-4">
                      <span className="material-symbols-outlined text-[14px]">flare</span>
                      SPRING / AUTUMN
                    </div>
                    <h3 className="font-headline font-extrabold text-2xl text-on-surface mb-2">{heroTask.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Frequency</span>
                        <span className="text-sm font-bold text-on-surface">Every {daysToLabel(heroTask.intervalDays)}</span>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); complete(heroTask) }}
                        className="bg-on-surface text-surface px-6 py-3 rounded-full font-bold shadow-lg active:scale-90 transition-transform"
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                  <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[8rem] text-primary/5 rotate-12 pointer-events-none">
                    eco
                  </span>
                </div>
              )}

              {secondTask && (
                <div
                  className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 cursor-pointer active:bg-surface-container-high transition-colors relative"
                  onClick={() => navigate(`/tasks/${secondTask.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline font-bold text-lg text-on-surface">{secondTask.name}</h3>
                      <span className="material-symbols-outlined absolute top-6 right-6 text-on-surface-variant/30">chevron_right</span>
                      <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Every {daysToLabel(secondTask.intervalDays)}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center ml-2">
                      <span className="text-[10px] font-bold">{getProgress(secondTask)}%</span>
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); complete(secondTask) }}
                    className="mt-6 w-full bg-surface-container-high text-on-surface-variant py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined">history</span>
                    Mark Done
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {totalPending === 0 && tasks.length > 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary/40" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <p className="font-headline font-bold text-lg">All caught up!</p>
            <p className="text-sm mt-1">No pending tasks right now.</p>
          </div>
        )}

      </div>
    </Layout>
  )
}
