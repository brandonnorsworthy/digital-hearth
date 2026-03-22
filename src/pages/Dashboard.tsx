import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import { mealService } from '../services/meals'
import { getCurrentWeekOf } from '../utils/meals'
import { getDueBadge, getTierIcon, getTierFromDays } from '../utils/task'
import { useToast } from '../contexts/ToastContext'
import type { Task } from '../types/api'
import type { WeeklyMeal } from '../types/api'

const TIER_COLORS = {
  short: { bg: 'bg-primary-container/40', icon: 'text-primary', label: 'text-primary', tier: 'Weekly' },
  medium: { bg: 'bg-secondary-container/40', icon: 'text-secondary', label: 'text-secondary', tier: 'Monthly' },
  long: { bg: 'bg-tertiary-container/30', icon: 'text-tertiary', label: 'text-tertiary', tier: 'Seasonal' },
}

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getHeadline(pendingCount: number) {
  if (pendingCount === 0) return { text: 'The house is quiet.', emphasis: 'quiet' }
  if (pendingCount === 1) return { text: 'One thing needs attention.', emphasis: 'attention' }
  return { text: `${pendingCount} things need attention.`, emphasis: 'attention' }
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const [tasks, setTasks] = useState<Task[]>([])
  const [tonightsDinner, setTonightsDinner] = useState<WeeklyMeal | undefined>()
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())

  async function loadData() {
    if (!user?.householdId) return
    const [taskData, mealData] = await Promise.all([
      taskService.list(user.householdId),
      mealService.weeklyList(user.householdId, getCurrentWeekOf()),
    ])
    setTasks(taskData)
    if (mealData.length) setTonightsDinner(mealData[Math.floor(Math.random() * mealData.length)])
  }

  useEffect(() => {
    loadData().catch(console.error)
  }, [user?.householdId])

  const hour = new Date().getHours()
  const greeting = getGreeting(hour)

  const urgentTasks = tasks.filter(t => {
    const { variant } = getDueBadge(t)
    return variant === 'urgent' || variant === 'soon'
  })
  const pendingCount = urgentTasks.filter(t => !completedIds.has(t.id)).length
  const { text: headlineText, emphasis } = getHeadline(pendingCount)

  const glanceTasks = tasks.slice(0, 3)

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
              {tonightsDinner?.imageData ? (
                <img
                  src={tonightsDinner.imageData}
                  alt={tonightsDinner.name}
                  className="w-full h-full object-cover"
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
              const colors = TIER_COLORS[getTierFromDays(task.intervalDays)]
              const checked = completedIds.has(task.id)
              return (
                <div
                  key={task.id}
                  className={`bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-outline-variant/10 transition-opacity ${checked ? 'opacity-40' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`${colors.bg} p-3 rounded-full`}>
                      <span className={`material-symbols-outlined ${colors.icon}`}>{getTierIcon(getTierFromDays(task.intervalDays))}</span>
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold ${colors.label} uppercase tracking-wider`}>
                        {colors.tier}
                      </span>
                      <h4 className="font-headline font-bold text-on-surface">{task.name}</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleCheck(task)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${checked
                      ? 'bg-primary border-primary'
                      : 'border-outline hover:bg-primary-container'
                      }`}
                  >
                    <span className={`material-symbols-outlined text-sm ${checked ? 'text-on-primary' : 'text-transparent'}`}>
                      check
                    </span>
                  </button>
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
