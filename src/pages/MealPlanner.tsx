import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { mealService } from '../services/meals'
import { mealImageUrl } from '../services/api'
import { getCurrentWeekOf } from '../utils/meals'
import { useToast } from '../contexts/ToastContext'
import type { WeeklyMeal, LibraryMeal } from '../types/api'

const MEAL_COLORS = ['bg-primary-container', 'bg-secondary-container', 'bg-tertiary-container/60', 'bg-surface-container-high']

function mealColor(index: number) {
  return MEAL_COLORS[index % MEAL_COLORS.length]
}

function getWeekRange() {
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay() + 1) // Monday
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${fmt(startOfWeek)} — ${fmt(endOfWeek)}`
}

export default function MealPlanner() {
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const [meals, setMeals] = useState<WeeklyMeal[]>([])
  const [library, setLibrary] = useState<LibraryMeal[]>([])
  const [input, setInput] = useState('')
  const [savingLibraryId, setSavingLibraryId] = useState<number | null>(null)

  const weekOf = getCurrentWeekOf()
  const inputRef = useRef<HTMLInputElement>(null)

  async function loadData() {
    if (!user?.householdId) return
    const [mealData, libraryData] = await Promise.all([
      mealService.weeklyList(user.householdId, weekOf),
      mealService.library(user.householdId),
    ])
    setMeals(mealData)
    setLibrary(libraryData)
  }

  useEffect(() => {
    loadData().catch(console.error)
  }, [user?.householdId, weekOf])

  async function addMeal(name: string, libraryId?: number) {
    if (!name.trim() || !user?.householdId) return
    const payload = libraryId
      ? { weekOf, mealLibraryId: libraryId }
      : { weekOf, name: name.trim() }
    try {
      const added = await mealService.addWeekly(user.householdId, payload)
      setMeals(prev => [...prev, added])
      setInput('')
      toast.success(`${name.trim()} added to this week`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to add meal. Please try again.')
    }
  }

  async function removeMeal(id: number) {
    setMeals(prev => prev.filter(m => m.id !== id))
    try {
      await mealService.removeWeekly(id)
      toast.success('Meal removed from this week')
    } catch {
      mealService.weeklyList(user!.householdId, weekOf).then(setMeals).catch(console.error)
      toast.error('Failed to remove meal. Please try again.')
    }
  }

  async function saveToLibrary(meal: WeeklyMeal) {
    if (!user?.householdId) return
    setSavingLibraryId(meal.id)
    try {
      const saved = await mealService.addToLibrary(user.householdId, meal.name)
      const updated = await mealService.updateWeekly(meal.id, { mealLibraryId: saved.id })
      setLibrary(prev => [...prev, saved])
      setMeals(prev => prev.map(m => m.id === meal.id ? updated : m))
      toast.success(`"${meal.name}" saved to library`)
    } catch {
      toast.error('Failed to save to library. Please try again.')
    } finally {
      setSavingLibraryId(null)
    }
  }

  return (
    <Layout title="Weekly Meals" subtitle={getWeekRange()} onRefresh={loadData}>
      <div className="pt-6 px-6 max-w-2xl mx-auto space-y-8 pb-4">
        {/* Quick Add */}
        <section className="bg-surface-container rounded-lg p-5 shadow-sm border border-outline-variant/10">
          <label className="block text-on-surface font-headline font-bold text-sm mb-3">
            What's cooking?
          </label>
          <div className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addMeal(input)}
              placeholder="Marry Me Chicken"
              className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-4 pr-14 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
            <button
              onClick={() => addMeal(input)}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary p-2 rounded-xl shadow-sm hover:scale-105 transition-transform disabled:opacity-40"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </section>

        {/* Weekly meal list */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-lg text-on-surface">Meals for the Week</h2>
            <span className="text-[12px] font-bold text-on-surface-variant/60 tracking-widest uppercase">
              {meals.length} Planned
            </span>
          </div>
          <div className="space-y-3">
            {meals.map((meal, i) => (
              <div
                key={meal.id}
                className="bg-surface-container-lowest rounded-xl p-4 flex items-center justify-between shadow-sm border border-outline-variant/5 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl overflow-hidden ${mealColor(i)} flex items-center justify-center`}>
                    {meal.isFromLibrary ? (
                      meal.hasImage && meal.mealLibraryId ? (
                        <img src={mealImageUrl(meal.mealLibraryId)} alt={meal.name} className="w-full h-full object-cover" loading="lazy" crossOrigin="use-credentials" />
                      ) : (
                        <span className="font-headline font-black text-on-surface/40 text-xl">
                          {meal.name[0]}
                        </span>
                      )
                    ) : (
                      <span className="material-symbols-outlined text-on-surface-variant/40">dinner_dining</span>
                    )}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">{meal.name}</p>
                    <p className="text-xs text-on-surface-variant capitalize">
                      {meal.isFromLibrary ? 'From library' : 'Manual entry'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!meal.isFromLibrary && (
                    <button
                      onClick={() => saveToLibrary(meal)}
                      disabled={savingLibraryId === meal.id}
                      className="p-2 text-outline-variant hover:text-primary transition-colors rounded-full hover:bg-primary-container/30 active:scale-95 disabled:opacity-40"
                      title="Save to library"
                    >
                      <span className="material-symbols-outlined text-lg">bookmark</span>
                    </button>
                  )}
                  <button
                    onClick={() => removeMeal(meal.id)}
                    className="p-2 text-outline-variant hover:text-error transition-colors rounded-full hover:bg-error-container/10 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {meal.isFromLibrary ? 'close' : 'delete'}
                    </span>
                  </button>
                </div>
              </div>
            ))}

            {/* Add placeholder */}
            <button
              onClick={() => {
                inputRef.current?.focus()
                document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="w-full bg-primary-container/30 border-2 border-dashed border-primary/20 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-primary-container/50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary/60">restaurant_menu</span>
              <p className="text-xs font-bold text-primary/80">Add another meal</p>
            </button>
          </div>
        </section>

        {/* Library shortcuts */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-base text-on-surface">From Your Library</h3>
            <button
              onClick={() => navigate('/meals/library')}
              className="text-xs font-bold text-primary flex items-center gap-1"
            >
              View all <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {library.map((item, i) => (
              <button
                key={item.id}
                onClick={() => addMeal(item.name, item.id)}
                className="shrink-0 w-32 bg-surface-container-low rounded-lg p-3 border border-outline-variant/10 text-center space-y-2 active:scale-95 transition-transform"
              >
                <div className={`w-16 h-16 mx-auto rounded-full overflow-hidden ${mealColor(i)} flex items-center justify-center`}>
                  {item.hasImage ? (
                    <img src={mealImageUrl(item.id)} alt={item.name} className="w-full h-full object-cover" loading="lazy" crossOrigin="use-credentials" />
                  ) : (
                    <span className="font-headline font-black text-on-surface/40 text-xl">
                      {item.name[0]}
                    </span>
                  )}
                </div>
                <p className="text-[12px] font-bold text-on-surface leading-tight">{item.name}</p>
              </button>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
