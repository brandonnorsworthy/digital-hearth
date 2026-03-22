import { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { mealService } from '../services/meals'
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
  const { showToast } = useToast()

  const [meals, setMeals] = useState<WeeklyMeal[]>([])
  const [library, setLibrary] = useState<LibraryMeal[]>([])
  const [input, setInput] = useState('')
  const [pendingName, setPendingName] = useState<string | null>(null)

  const weekOf = getCurrentWeekOf()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!user?.householdId) return
    mealService.weeklyList(user.householdId, weekOf).then(setMeals).catch(console.error)
    mealService.library(user.householdId).then(setLibrary).catch(console.error)
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
      if (!libraryId) setPendingName(name.trim())
    } catch (err) {
      console.error(err)
      showToast('Failed to add meal. Please try again.')
    }
  }

  async function removeMeal(id: number) {
    setMeals(prev => prev.filter(m => m.id !== id))
    setPendingName(null)
    try {
      await mealService.removeWeekly(id)
    } catch {
      // revert optimistic removal
      mealService.weeklyList(user!.householdId, weekOf).then(setMeals).catch(console.error)
      showToast('Failed to remove meal. Please try again.')
    }
  }

  async function handleSaveToLibrary() {
    if (!pendingName || !user?.householdId) return
    try {
      const saved = await mealService.addToLibrary(user.householdId, pendingName)
      setLibrary(prev => [...prev, saved])
    } catch (err) {
      console.error(err)
      showToast('Failed to save to library. Please try again.')
    } finally {
      setPendingName(null)
    }
  }

  return (
    <Layout title="Weekly Meals">
      <div className="pt-6 px-6 max-w-2xl mx-auto space-y-8 pb-4">

        {/* Week range subtitle */}
        <p className="text-[10px] font-semibold tracking-wider text-on-surface-variant uppercase -mt-2 text-center">
          {getWeekRange()}
        </p>

        {/* Quick Add */}
        <section className="bg-surface-container rounded-xl p-5 shadow-sm border border-outline-variant/10">
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

          {/* Save to library nudge */}
          {pendingName && (
            <div className="mt-4 flex items-center justify-between bg-secondary-container/80 backdrop-blur-md p-3 rounded-xl border border-on-secondary-container/5">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-on-secondary-container text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <p className="text-xs font-semibold text-on-secondary-container leading-tight">
                  Save "{pendingName}" to Library?
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setPendingName(null)}
                  className="text-[10px] font-bold px-3 py-1.5 bg-white/40 hover:bg-white/60 rounded-full transition-colors"
                >
                  Not now
                </button>
                <button
                  onClick={handleSaveToLibrary}
                  className="text-[10px] font-bold px-3 py-1.5 bg-primary text-on-primary rounded-full shadow-sm hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Weekly meal list */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-lg text-on-surface">Meals for the Week</h2>
            <span className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase">
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
                      <span className="font-headline font-black text-on-surface/40 text-xl">
                        {meal.name[0]}
                      </span>
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
                <button
                  onClick={() => removeMeal(meal.id)}
                  className="p-2 text-outline-variant hover:text-error transition-colors rounded-full hover:bg-error-container/10 active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            ))}

            {/* Add placeholder */}
            <button
              onClick={() => inputRef.current?.focus()}
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
            <button className="text-xs font-bold text-primary flex items-center gap-1">
              View all <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {library.map((item, i) => (
              <button
                key={item.id}
                onClick={() => addMeal(item.name, item.id)}
                className="shrink-0 w-32 bg-surface-container-low rounded-xl p-3 border border-outline-variant/10 text-center space-y-2 active:scale-95 transition-transform"
              >
                <div className={`w-16 h-16 mx-auto rounded-full ${mealColor(i)} flex items-center justify-center`}>
                  <span className="font-headline font-black text-on-surface/40 text-2xl">
                    {item.name[0]}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-on-surface leading-tight">{item.name}</p>
              </button>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
