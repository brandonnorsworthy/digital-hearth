import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { mealService } from '../services/meals'
import { getCurrentWeekOf } from '../utils/meals'
import { useToast } from '../contexts/ToastContext'
import { MEAL_CARD_COLORS, MEAL_CATEGORIES, MEAL_CATEGORY_TAG_MAP } from '../constants/meals'
import type { LibraryMeal } from '../types/api'

export default function MealLibrary() {
  const { user } = useAuth()
  const toast = useToast()

  const [library, setLibrary] = useState<LibraryMeal[]>([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Meals')
  const [addingId, setAddingId] = useState<number | null>(null)

  const weekOf = getCurrentWeekOf()

  useEffect(() => {
    if (!user?.householdId) return
    mealService.library(user.householdId).then(setLibrary).catch(console.error)
  }, [user?.householdId])

  const filtered = library.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All Meals'
      || m.tags.includes(MEAL_CATEGORY_TAG_MAP[activeCategory])
    return matchesSearch && matchesCategory
  })

  async function addToWeek(meal: LibraryMeal) {
    if (!user?.householdId || addingId === meal.id) return
    setAddingId(meal.id)
    try {
      await mealService.addWeekly(user.householdId, { weekOf, mealLibraryId: meal.id })
      toast.success(`${meal.name} added to this week`)
    } catch {
      toast.error('Failed to add meal. Please try again.')
    } finally {
      setAddingId(null)
    }
  }

  async function removeFromLibrary(meal: LibraryMeal) {
    setLibrary(prev => prev.filter(m => m.id !== meal.id))
    try {
      await mealService.removeFromLibrary(meal.id)
      toast.success(`${meal.name} removed from library`)
    } catch {
      setLibrary(prev => [...prev, meal])
      toast.error('Failed to remove meal.')
    }
  }

  return (
    <Layout title="Meal Library" focusMode>
      <div className="pt-8 px-6 max-w-2xl mx-auto pb-8">

        {/* Hero search */}
        <section className="mb-8">
          <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">
            What's for dinner?
          </h2>
          <p className="text-on-surface-variant mb-6">
            Browse your family's saved meals and add them to this week.
          </p>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by meal name..."
              className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
          </div>
        </section>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-6 px-6 scrollbar-hide mb-8">
          {MEAL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 rounded-full font-medium text-sm transition-colors ${activeCategory === cat
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {library.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span
              className="material-symbols-outlined text-5xl block mb-4 text-primary/40"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              menu_book
            </span>
            <p className="font-headline font-bold text-lg">Your library is empty</p>
            <p className="text-sm mt-1">Save meals from the planner to build your collection.</p>
          </div>
        )}

        {/* No search results */}
        {library.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl block mb-4 text-primary/40">search_off</span>
            <p className="font-headline font-bold text-lg">No matches found</p>
            <p className="text-sm mt-1">Try a different search term.</p>
          </div>
        )}

        {/* Meal grid */}
        {library.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map((meal, i) => (
              <div
                key={meal.id}
                className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/5"
              >
                {/* Image / color block */}
                <div className="h-48 relative overflow-hidden">
                  {meal.imageUrl ? (
                    <img
                      src={meal.imageUrl}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`h-full bg-linear-to-br ${MEAL_CARD_COLORS[i % MEAL_CARD_COLORS.length]} flex items-center justify-center`}>
                      <span className="font-headline font-black text-8xl text-on-surface/20 select-none">
                        {meal.name[0]}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFromLibrary(meal)}
                    className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-error transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>

                {/* Info + action */}
                <div className="px-5 py-4">
                  <h3 className="font-headline font-bold text-on-surface text-xl leading-tight mb-4">
                    {meal.name}
                  </h3>
                  <div className="flex items-center justify-between border-t border-outline-variant/15 pt-4">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-[11px] font-bold text-on-secondary-container">
                      {meal.createdBy[0]}
                    </div>
                    <button
                      onClick={() => addToWeek(meal)}
                      disabled={addingId === meal.id}
                      className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40"
                    >
                      Add to Week
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add new placeholder */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 rounded-xl p-8 bg-surface-container-low/30 hover:bg-surface-container-low transition-colors cursor-pointer active:scale-[0.98]">
              <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-[28px]">add_circle</span>
              </div>
              <h3 className="font-headline font-bold text-on-surface text-sm text-center">Add a new recipe</h3>
              <p className="text-on-surface-variant text-center text-xs mt-1">
                Save a meal to your library
              </p>
            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}
