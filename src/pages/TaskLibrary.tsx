import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Skeleton from '../components/Skeleton'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import { getTierFromDays } from '../utils/task'
import { daysToNUnit } from '../utils/intervals'
import type { Task } from '../types/api'

function intervalLabel(task: Task): string {
  if (task.isOneTime) {
    return `Due ${new Date(task.nextDueAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
  }
  const { n, unit } = daysToNUnit(task.intervalDays)
  return `Every ${n} ${unit}${n !== 1 ? 's' : ''}`
}

type TierSection = {
  key: 'short' | 'medium' | 'long'
  label: string
  subtitle: string
  dotColor: string
  iconBg: string
  iconColor: string
}

const TIER_SECTIONS: TierSection[] = [
  {
    key: 'short',
    label: 'Short Term',
    subtitle: 'Weekly',
    dotColor: 'bg-primary',
    iconBg: 'bg-primary-container',
    iconColor: 'text-primary',
  },
  {
    key: 'medium',
    label: 'Medium Term',
    subtitle: 'Monthly',
    dotColor: 'bg-tertiary',
    iconBg: 'bg-tertiary-container/30',
    iconColor: 'text-tertiary',
  },
  {
    key: 'long',
    label: 'Long Term',
    subtitle: 'Seasonal / Yearly',
    dotColor: 'bg-secondary',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface-variant',
  },
]

export default function TaskLibrary() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<Task[]>([])
  const [search, setSearch] = useState('')
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

  const filtered = tasks.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <Layout title="Task Library" focusMode onRefresh={loadData}>
        <div className="pt-8 px-6 max-w-2xl mx-auto pb-8">
          <div className="mb-10 space-y-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
          {[0].map(section => (
            <section key={section} className="mb-12">
              <div className="flex items-center gap-4 mb-6 ml-2">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="space-y-3">
                {[0, 1, 2].map(i => (
                  <div key={i} className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="w-5 h-5 rounded" />
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
    <Layout title="Task Library" focusMode onRefresh={loadData}>
      <div className="pt-8 px-6 max-w-2xl mx-auto pb-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">Task Library</h2>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full bg-surface-container-high border-none rounded-xl py-5 pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
            />
          </div>
        </div>

        {/* Sections */}
        {TIER_SECTIONS.map(section => {
          const sectionTasks = filtered.filter(t => getTierFromDays(t.intervalDays) === section.key)
          if (sectionTasks.length === 0) return null
          return (
            <section key={section.key} className="mb-12">
              <div className="flex items-center gap-4 mb-6 ml-2">
                <div className={`w-2 h-2 rounded-full ${section.dotColor}`} />
                <h3 className="font-headline font-bold text-xl text-on-surface">{section.label}</h3>
                <span className="text-on-surface-variant text-sm font-medium opacity-60">{section.subtitle}</span>
              </div>
              <div className="space-y-3">
                {sectionTasks.map(task => (
                  <div
                    key={task.id}
                    className="bg-surface-container-lowest p-5 rounded-xl flex items-center justify-between group hover:bg-surface-container transition-colors duration-300 cursor-pointer"
                    onClick={() => navigate(`/tasks/${task.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${section.iconBg} flex items-center justify-center ${section.iconColor} shrink-0`}>
                        <span className="material-symbols-outlined">task_alt</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-on-surface text-base">{task.name}</h4>
                        <p className="text-on-surface-variant text-sm">{intervalLabel(task)}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors shrink-0">chevron_right</span>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* Empty states */}
        {tasks.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary/40">library_books</span>
            <p className="font-headline font-bold text-lg">No tasks yet</p>
            <p className="text-sm mt-1">Tap + to add your first household task.</p>
          </div>
        )}

        {tasks.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl mb-4 block text-primary/40">search_off</span>
            <p className="font-headline font-bold text-lg">No results</p>
            <p className="text-sm mt-1">Try a different search term.</p>
          </div>
        )}

      </div>
    </Layout>
  )
}
