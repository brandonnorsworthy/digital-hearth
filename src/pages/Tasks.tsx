import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import { getProgress, getTierFromDays, isTaskDone } from '../utils/task'
import { daysToLabel } from '../utils/intervals'
import { useToast } from '../contexts/ToastContext'
import type { Task } from '../types/api'

export default function Tasks() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const [tasks, setTasks] = useState<Task[]>([])
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())

  async function loadData() {
    if (!user?.householdId) return
    const data = await taskService.list(user.householdId)
    setTasks(data)
  }

  useEffect(() => {
    loadData().catch(console.error)
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
      toast.error('Failed to complete task. Please try again.')
    }
  }

  function isCompleting(task: Task) {
    return completedIds.has(task.id) || isTaskDone(task)
  }

  const shortTasks = tasks.filter(t => getTierFromDays(t.intervalDays) === 'short')
  const mediumTasks = tasks.filter(t => getTierFromDays(t.intervalDays) === 'medium')
  const longTasks = tasks.filter(t => getTierFromDays(t.intervalDays) === 'long')
  const totalPending = tasks.filter(t => !isCompleting(t)).length

  const [heroTask, secondTask] = longTasks

  return (
    <Layout showFab onFabClick={() => navigate('/tasks/new')} title="Household Tasks" onRefresh={loadData}>
      <div className="pt-6 px-6 max-w-md mx-auto pb-4">
        {totalPending === 0 && tasks.length > 0 && (
          <div className="text-center pb-18 pt-8 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary/40" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <p className="font-headline font-bold text-lg">All caught up!</p>
            <p className="text-sm mt-1">No pending tasks right now.</p>
          </div>
        )}

        {/* Short Term */}
        {shortTasks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 ml-1">
              <span className="material-symbols-outlined text-primary">bolt</span>
              <h2 className="font-headline font-bold text-2xl text-on-surface">Short Term</h2>
              <span className="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full ml-auto">Weekly</span>
            </div>
            <div className="space-y-6">
              {shortTasks.map(task => (
                <TaskCard key={task.id} task={task} onComplete={() => complete(task)} completing={isCompleting(task)} />
              ))}
            </div>
          </section>
        )}

        {/* Medium Term */}
        {mediumTasks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 ml-1">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              <h2 className="font-headline font-bold text-2xl text-on-surface">Medium Term</h2>
              <span className="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full ml-auto">Monthly</span>
            </div>
            <div className="space-y-6">
              {mediumTasks.map(task => (
                <TaskCard key={task.id} task={task} onComplete={() => complete(task)} completing={isCompleting(task)} />
              ))}
            </div>
          </section>
        )}

        {/* Long Term */}
        {longTasks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 ml-1">
              <span className="material-symbols-outlined text-primary">hourglass_empty</span>
              <h2 className="font-headline font-bold text-2xl text-on-surface">Long Term</h2>
              <span className="text-xs font-bold text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded-full ml-auto">Seasonal / Yearly</span>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {heroTask && (() => {
                const heroCompleting = isCompleting(heroTask)
                return (
                  <div
                    className={`p-8 rounded-xl relative overflow-hidden group transition-transform ${heroCompleting ? 'bg-surface-container opacity-60' : 'bg-primary-container/30 cursor-pointer active:scale-[0.99]'}`}
                    onClick={heroCompleting ? undefined : () => navigate(`/tasks/${heroTask.id}`)}
                  >
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold mb-4">
                        <span className="material-symbols-outlined text-[14px]">{heroCompleting ? 'check_circle' : 'flare'}</span>
                        {heroCompleting ? 'COMPLETED' : 'SPRING / AUTUMN'}
                      </div>
                      <h3 className="font-headline font-extrabold text-2xl text-on-surface mb-2">{heroTask.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant">Frequency</span>
                          <span className="text-sm font-bold text-on-surface">Every {daysToLabel(heroTask.intervalDays)}</span>
                        </div>
                        {!heroCompleting && (
                          <button
                            onClick={e => { e.stopPropagation(); complete(heroTask) }}
                            className="bg-on-surface text-surface px-6 py-3 rounded-full font-bold shadow-lg active:scale-90 transition-transform"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                    <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[8rem] text-primary/5 rotate-12 pointer-events-none">
                      eco
                    </span>
                  </div>
                )
              })()}

              {secondTask && (() => {
                const secondCompleting = isCompleting(secondTask)
                return (
                  <div
                    className={`p-6 rounded-xl border border-outline-variant/10 transition-colors relative ${secondCompleting ? 'bg-surface-container-high opacity-60' : 'bg-surface-container-low cursor-pointer active:bg-surface-container-high'}`}
                    onClick={secondCompleting ? undefined : () => navigate(`/tasks/${secondTask.id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-headline font-bold text-lg text-on-surface">{secondTask.name}</h3>
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
                      onClick={e => { e.stopPropagation(); if (!secondCompleting) complete(secondTask) }}
                      disabled={secondCompleting}
                      className={`mt-6 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform ${secondCompleting ? 'border-2 border-outline text-on-surface-variant' : 'bg-surface-container-high text-on-surface-variant active:scale-95'}`}
                    >
                      <span className="material-symbols-outlined">{secondCompleting ? 'check_circle' : 'history'}</span>
                      {secondCompleting ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>
                )
              })()}
            </div>
          </section>
        )}

        {/* Manage All Tasks */}
        {tasks.length > 0 && (
          <div className="mb-8">
            <button
              onClick={() => navigate('/tasks/library')}
              className="w-full flex items-center justify-between px-5 py-4 bg-surface-container-low rounded-xl border border-outline-variant/10 active:bg-surface-container-high transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">library_books</span>
                <span className="font-headline font-bold text-on-surface">Manage All Tasks</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant/40">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
