import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import SelectSheet from '../components/SelectSheet'
import { useAuth } from '../contexts/AuthContext'
import { taskService } from '../services/tasks'
import { INTERVAL_UNITS, daysToNUnit, nUnitToDays } from '../utils/intervals'
import { getTierFromDays } from '../utils/task'
import type { IntervalUnit } from '../utils/intervals'

export default function EditTask() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isNew = id === 'new'

  const [name, setName] = useState('')
  const [intervalN, setIntervalN] = useState(1)
  const [intervalUnit, setIntervalUnit] = useState<IntervalUnit>('Week')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unitSheetOpen, setUnitSheetOpen] = useState(false)

  useEffect(() => {
    if (isNew || !user?.householdId) return
    taskService.list(user.householdId).then(tasks => {
      const task = tasks.find(t => t.id === Number(id))
      if (task) {
        setName(task.name)
        const { n, unit } = daysToNUnit(task.intervalDays)
        setIntervalN(n)
        setIntervalUnit(unit)
      }
    }).catch(console.error)
  }, [id, isNew, user?.householdId])

  async function handleSave() {
    if (!name.trim() || !user?.householdId) return
    setSaving(true)
    setError(null)
    try {
      const intervalDays = nUnitToDays(intervalN, intervalUnit)
      const tier = getTierFromDays(intervalDays)
      if (isNew) {
        await taskService.create(user.householdId, { name: name.trim(), tier, intervalDays })
      } else {
        await taskService.update(Number(id), { name: name.trim(), tier, intervalDays })
      }
      navigate(-1)
    } catch {
      setError('Failed to save task. Please try again.')
      setSaving(false)
    }
  }

  async function handleDelete() {
    setSaving(true)
    try {
      await taskService.delete(Number(id))
      navigate('/tasks')
    } catch {
      setError('Failed to delete task. Please try again.')
      setSaving(false)
    }
  }

  return (
    <Layout
      title="Digital Hearth"
      focusMode
    >
      <div className="pt-8 px-6 max-w-2xl mx-auto">

        {/* Editorial header */}
        <header className="mb-8">
          <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-2 block">
            Task Management
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface leading-tight tracking-tight">
            {isNew ? 'Add Household' : 'Edit Household'}&nbsp;Task
          </h2>
        </header>

        <div className="space-y-6">
          {/* Task Name */}
          <div className="space-y-3">
            <label className="font-headline font-bold text-on-surface-variant text-sm ml-1">Task Name</label>
            <div className="bg-surface-container-high rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all mt-3">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-4 text-on-surface font-medium text-lg placeholder:text-outline-variant"
              />
            </div>
          </div>

          {/* Frequency Schedule */}
          <div className="space-y-3">
            <label className="font-headline font-bold text-on-surface-variant text-sm ml-1">Frequency Schedule</label>
            <div className="bg-surface-container-high rounded-xl p-2 shadow-sm mt-3">
              <div className="flex items-center gap-2">
                <div className="flex-[0.8] pl-4">
                  <span className="text-on-surface-variant font-headline font-bold text-sm uppercase tracking-wider">Every</span>
                </div>
                <div className="flex-1 bg-surface-container-lowest rounded-lg">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={intervalN}
                    onChange={e => setIntervalN(Math.max(1, Math.min(12, parseInt(e.target.value) || 1)))}
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-4 text-on-surface font-bold text-center text-lg"
                  />
                </div>
                <button
                  onClick={() => setUnitSheetOpen(true)}
                  className="flex-2 bg-surface-container-lowest rounded-lg px-4 py-4 text-on-surface font-bold text-lg text-left flex items-center justify-between gap-2"
                >
                  <span>{intervalUnit}{intervalN !== 1 ? 's' : ''}</span>
                  <span className="material-symbols-outlined text-on-surface-variant text-base">expand_more</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-outline font-medium px-2 mt-4">Set how often this task should repeat.</p>
          </div>

          {/* Visual context card */}
          <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary-container/50 to-secondary-container/30 h-48 flex items-center p-6 mt-2">
            <div className="relative z-10 bg-surface/90 backdrop-blur-md p-4 rounded-lg flex items-center gap-4 shadow-sm w-full">
              <div className="bg-primary-container p-2 rounded-full">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  schedule
                </span>
              </div>
              <div>
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Upcoming Task</p>
                <p className="text-sm font-headline font-bold text-on-surface leading-tight">
                  {name ? name : 'New Task'} · {intervalN} {intervalUnit}{intervalN !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-error font-medium text-center">{error}</p>
          )}

          {/* Actions */}
          <div className="pt-4 space-y-4 pb-8">
            <button
              onClick={handleSave}
              disabled={!name.trim() || saving}
              className="w-full py-5 rounded-xl bg-linear-to-r from-primary to-primary-dim text-on-primary font-headline font-extrabold text-lg shadow-xl shadow-primary/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              {isNew ? 'Add Task' : 'Save Changes'}
            </button>

            {!isNew && (
              <button
                onClick={handleDelete}
                disabled={saving}
                className="w-full py-4 rounded-xl text-error font-semibold text-sm hover:bg-error/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
                Delete Task
              </button>
            )}
          </div>
        </div>
      </div>
      {unitSheetOpen && (
        <SelectSheet
          title="Repeat every..."
          options={INTERVAL_UNITS.map(u => u)}
          value={intervalUnit}
          onSelect={v => setIntervalUnit(v as IntervalUnit)}
          onClose={() => setUnitSheetOpen(false)}
        />
      )}
    </Layout>
  )
}
