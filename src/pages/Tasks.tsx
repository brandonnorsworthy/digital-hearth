import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import Skeleton from '../components/Skeleton'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import { getTierFromDays, isTaskDone, isTaskVisible } from '../utils/task'
import { useToast } from '../contexts/ToastContext'
import type { Task } from '../types/api'

export default function Tasks() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const [tasks, setTasks] = useState<Task[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user?.householdId) return
    const data = await taskService.list(user.householdId)
    setTasks(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    loadData().catch(console.error)
  }, [loadData])

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

  const shortTasks = tasks.filter(t => getTierFromDays(t.intervalDays) === 'short' && isTaskVisible(t))
  const mediumTasks = tasks.filter(t => getTierFromDays(t.intervalDays) === 'medium' && isTaskVisible(t))
  const longTasks = tasks.filter(t => getTierFromDays(t.intervalDays) === 'long' && isTaskVisible(t))
  const totalPending = tasks.filter(t => !isCompleting(t)).length

  if (loading) {
    return (
      <Layout showFab onFabClick={() => navigate('/tasks/new')} title="Household Tasks" onRefresh={loadData}>
        <div className="pt-6 px-6 max-w-md mx-auto pb-4 space-y-12">
          {[0].map(section => (
            <section key={section}>
              <div className="flex items-center gap-2 mb-6 ml-1">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-5 w-16 rounded-full ml-auto" />
              </div>
              <div className="space-y-6">
                {[0, 1, 2].map(i => (
                  <div key={i} className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Layout>
    )
  }

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
            <div className="space-y-6">
              {longTasks.map(task => (
                <TaskCard key={task.id} task={task} onComplete={() => complete(task)} completing={isCompleting(task)} />
              ))}
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
