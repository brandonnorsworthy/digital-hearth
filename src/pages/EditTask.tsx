import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { MOCK_TASKS, INTERVALS } from '../mock/data'
import type { TaskTier } from '../mock/data'

const TIER_OPTIONS: { tier: TaskTier; label: string; icon: string }[] = [
  { tier: 'long', label: 'Long', icon: 'auto_awesome_motion' },
  { tier: 'medium', label: 'Medium', icon: 'waves' },
  { tier: 'short', label: 'Short', icon: 'bolt' },
]

export default function EditTask() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'

  const existing = isNew ? null : MOCK_TASKS.find(t => t.id === Number(id))

  const [name, setName] = useState(existing?.name ?? '')
  const [tier, setTier] = useState<TaskTier>(existing?.tier ?? 'medium')
  const [interval, setInterval] = useState(existing?.intervalLabel?.replace('Every ', '') ?? '1 Week')

  function handleSave() {
    // Demo: just navigate back
    navigate(-1)
  }

  function handleDelete() {
    navigate('/tasks')
  }

  return (
    <Layout
      title="Digital Hearth"
      focusMode
    >
      <div className="pt-8 px-6 max-w-2xl mx-auto">

        {/* Editorial header */}
        <header className="mb-10">
          <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-2 block">
            Task Management
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface leading-tight tracking-tight">
            {isNew ? 'Add Household' : 'Edit Household'}<br />Task
          </h2>
        </header>

        <div className="space-y-8">
          {/* Task Name */}
          <div className="space-y-3">
            <label className="font-headline font-bold text-on-surface-variant text-sm ml-1">Task Name</label>
            <div className="bg-surface-container-high rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-4 text-on-surface font-medium text-lg placeholder:text-outline-variant"
              />
            </div>
          </div>

          {/* Tier */}
          <div className="space-y-4">
            <label className="font-headline font-bold text-on-surface-variant text-sm ml-1">Recurrence Tier</label>
            <div className="grid grid-cols-3 gap-3">
              {TIER_OPTIONS.map(opt => {
                const isActive = tier === opt.tier
                return (
                  <button
                    key={opt.tier}
                    onClick={() => setTier(opt.tier)}
                    className={`flex flex-col items-center justify-center p-5 rounded-xl transition-all ${
                      isActive
                        ? 'bg-primary-container border-2 border-primary/20 shadow-sm scale-105'
                        : 'bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined mb-2 ${isActive ? 'text-primary' : 'text-secondary'}`}
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {opt.icon}
                    </span>
                    <span className={`font-headline font-bold text-sm ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interval */}
          <div className="space-y-3">
            <label className="font-headline font-bold text-on-surface-variant text-sm ml-1">Interval</label>
            <div className="flex items-center bg-surface-container-high rounded-xl p-1 gap-2">
              <div className="flex-1 px-5 py-4">
                <span className="text-on-surface font-medium">Every</span>
              </div>
              <div className="flex-2 bg-surface-container-lowest rounded-lg">
                <select
                  value={interval}
                  onChange={e => setInterval(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-4 py-4 text-on-surface font-bold text-center cursor-pointer"
                >
                  {INTERVALS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Visual context card */}
          <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary-container/50 to-secondary-container/30 h-48 flex items-end p-6 mt-2">
            <div className="absolute inset-0 flex items-center justify-end pr-8 opacity-10">
              <span className="material-symbols-outlined text-[6rem] text-primary rotate-12">
                {TIER_OPTIONS.find(o => o.tier === tier)?.icon ?? 'task_alt'}
              </span>
            </div>
            <div className="relative z-10 bg-white/80 backdrop-blur-md p-4 rounded-lg flex items-center gap-4 shadow-sm max-w-xs">
              <div className="bg-primary-container p-2 rounded-full">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  schedule
                </span>
              </div>
              <div>
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Recurrence</p>
                <p className="text-sm font-headline font-bold text-on-surface leading-tight">
                  Every {interval} · {tier.charAt(0).toUpperCase() + tier.slice(1)} tier
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 space-y-4 pb-8">
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className="w-full py-5 rounded-xl bg-linear-to-r from-primary to-primary-dim text-on-primary font-headline font-extrabold text-lg shadow-xl shadow-primary/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              {isNew ? 'Add Task' : 'Save Changes'}
            </button>

            {!isNew && (
              <button
                onClick={handleDelete}
                className="w-full py-4 rounded-xl text-error font-semibold text-sm hover:bg-error/5 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
                Delete Task
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
