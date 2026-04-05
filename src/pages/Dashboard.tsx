import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Skeleton from '../components/Skeleton'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import { mealService } from '../services/meals'
import { mealImageUrl } from '../services/api'
import { getCurrentWeekOf } from '../utils/meals'
import { getDueBadge, isTaskDone } from '../utils/task'
import { useToast } from '../contexts/ToastContext'
import DueBadge from '../components/DueBadge'
import type { Task } from '../types/api'
import type { WeeklyMeal } from '../types/api'
import { getGreeting, getHeadline } from '../utils/dashboard'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const [tasks, setTasks] = useState<Task[]>([])
  const [tonightsDinner, setTonightsDinner] = useState<WeeklyMeal | undefined>()
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user?.householdId) return
    const [taskData, mealData] = await Promise.all([
      taskService.list(user.householdId),
      mealService.weeklyList(user.householdId, getCurrentWeekOf()),
    ])
    setTasks(taskData)
    setCompletedIds(new Set(taskData.filter(isTaskDone).map(t => t.id)))
    if (mealData.length) setTonightsDinner(mealData[Math.floor(Math.random() * mealData.length)])
    setLoading(false)
  }, [user])

  useEffect(() => {
    loadData().catch(console.error)
  }, [loadData])

  const hour = new Date().getHours()
  const greeting = getGreeting(hour)

  const urgentTasks = tasks.filter(t => {
    const { variant } = getDueBadge(t)
    return variant === 'urgent' || variant === 'soon'
  })
  const pendingCount = urgentTasks.filter(t => !completedIds.has(t.id) && !isTaskDone(t)).length
  const { text: headlineText, emphasis } = getHeadline(pendingCount)

  const incompleteTasks = tasks.filter(t => !completedIds.has(t.id) && !isTaskDone(t))
  const glanceTasks = incompleteTasks.slice(0, 3)

  async function toggleCheck(task: Task) {
    if (completedIds.has(task.id)) return
    setCompletedIds(prev => new Set([...prev, task.id]))
    try {
      const updated = await taskService.complete(task.id)
      setTasks(prev => prev.map(t => t.id === updated.id ? updated : t))
    } catch {
      setCompletedIds(prev => {
        const next = new Set(prev)
        next.delete(task.id)
        return next
      })
      toast.error('Failed to complete task. Please try again.')
    }
  }

  if (loading) {
    return (
      <Layout onRefresh={loadData}>
        <div className="px-6 pb-4 space-y-8 pt-6">
          <section>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-9 w-3/4" />
          </section>
          <section>
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="w-full rounded-xl" style={{ aspectRatio: '16/10' }} />
          </section>
          <section className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="grid gap-3">
              {[0, 1, 2].map(i => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    )
  }

  return (
    <Layout onRefresh={loadData}>
      <div className="px-6 pb-4 space-y-8 pt-6">

        {/* Welcome */}
        <section>
          <p className="text-on-surface-variant font-semibold tracking-wide text-sm">
            {greeting}, {user?.username}
          </p>
          <h2 className="font-headline font-extrabold text-3xl text-on-surface mt-1 leading-tight">
            {headlineText.split(emphasis).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className="text-primary italic">{emphasis}</span>
                </span>
              ) : part
            )}
          </h2>
        </section>

        {/* Tonight's Dinner */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline font-bold text-xl tracking-tight">Tonight's Suggestion</h3>
            <button
              onClick={() => navigate('/meals')}
              className="text-sm font-semibold text-primary"
            >
              View meal planner →
            </button>
          </div>
          <div
            className="relative overflow-hidden rounded-xl shadow-sm group cursor-pointer"
            onClick={() => navigate('/meals')}
          >
            <div className="aspect-16/10 w-full">
              {tonightsDinner?.hasImage && tonightsDinner?.mealLibraryId ? (
                <img
                  src={tonightsDinner.imageGuid ? mealImageUrl(tonightsDinner.mealLibraryId, tonightsDinner.imageGuid) : ''}
                  alt={tonightsDinner.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-primary-container via-surface-container to-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[8rem] text-primary opacity-10">restaurant</span>
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  {/* <span className="bg-primary-container/90 backdrop-blur-md text-on-primary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Main Course
                  </span> */}
                  <h4 className="text-white font-headline font-bold text-2xl">{tonightsDinner?.name ?? 'Nothing planned'}</h4>
                  <p className="text-white/80 text-sm font-medium">Tap to plan the week</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); navigate('/meals') }}
                  className="bg-primary text-on-primary p-4 rounded-full shadow-lg active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tasks at a Glance */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline font-bold text-xl tracking-tight">Tasks at a Glance</h3>
          </div>
          <div className="grid gap-3">
            {glanceTasks.map(task => {
              const { variant, label } = getDueBadge(task)
              return (
                <div
                  key={task.id}
                  className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant/10"
                >
                  <h4 className="font-headline font-bold text-on-surface">{task.name}</h4>
                  <div className="flex items-center gap-3 shrink-0">
                    <DueBadge variant={variant} label={label} />
                    <button
                      onClick={() => toggleCheck(task)}
                      className="w-6 h-6 rounded-full border border-outline flex items-center justify-center hover:bg-primary-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm text-transparent">check</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="w-full text-center text-sm font-semibold text-primary py-2"
          >
            View all tasks →
          </button>
        </section>
      </div>
    </Layout>
  )
}
