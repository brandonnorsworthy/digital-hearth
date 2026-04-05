import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Skeleton from '../components/Skeleton'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import type { Completion, Task } from '../types/api'

export default function TaskHistory() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [task, setTask] = useState<Task | null>(null)
  const [history, setHistory] = useState<Completion[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user?.householdId || !id) return
    const [tasks, completions] = await Promise.all([
      taskService.list(user.householdId),
      taskService.history(id),
    ])
    setTask(tasks.find(t => t.id === id) ?? null)
    setHistory(completions)
    setLoading(false)
  }, [user?.householdId, id])

  useEffect(() => {
    loadData().catch(console.error)
  }, [loadData])

  if (loading) {
    return (
      <Layout title="Completion History" focusMode onRefresh={loadData}>
        <div className="pt-8 px-6 max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-5 w-48 mb-6" />
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Completion History" focusMode onRefresh={loadData}>
      <div className="pt-8 px-6 max-w-2xl mx-auto pb-8">

        <header className="mb-6">
          <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-1">Task</p>
          <h2 className="font-headline font-extrabold text-2xl text-on-surface leading-tight">
            {task?.name ?? '—'}
          </h2>
        </header>

        {history.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl text-primary/30" style={{ fontVariationSettings: "'FILL' 1" }}>
              history
            </span>
            <p className="font-headline font-bold text-on-surface">No completions yet</p>
            <p className="text-sm">This task hasn't been completed by anyone.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map(entry => (
              <div
                key={entry.id}
                className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/10"
              >
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                  <span className="font-headline font-bold text-on-primary-container text-base">
                    {entry.username[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">{entry.username}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {new Date(entry.completedAt).toLocaleDateString('en-US', {
                      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
                    })}
                    {' · '}
                    {new Date(entry.completedAt).toLocaleTimeString('en-US', {
                      hour: 'numeric', minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-8 w-full py-3.5 rounded-xl bg-surface-container font-bold text-on-surface active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Task
        </button>

      </div>
    </Layout>
  )
}
