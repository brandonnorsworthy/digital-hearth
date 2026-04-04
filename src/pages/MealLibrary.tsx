import { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { mealService } from '../services/meals'
import { mealImageUrl } from '../services/api'
import { getCurrentWeekOf } from '../utils/meals'
import { useToast } from '../contexts/ToastContext'
import { MEAL_CARD_COLORS, MEAL_CATEGORIES, MEAL_CATEGORY_TAG_MAP, CATEGORY_ALL, CATEGORY_FAVORITES } from '../constants/meals'
import type { LibraryMeal } from '../types/api'

const IMAGE_REGEN_TAP_COUNT = 3
const IMAGE_REGEN_TAP_RESET_MS = 1000

export default function MealLibrary() {
  const { user } = useAuth()
  const toast = useToast()

  const [library, setLibrary] = useState<LibraryMeal[]>([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL)
  const [addingId, setAddingId] = useState<number | null>(null)
  const [confirmDeleteMeal, setConfirmDeleteMeal] = useState<LibraryMeal | null>(null)
  const [confirmRegenerateMeal, setConfirmRegenerateMeal] = useState<LibraryMeal | null>(null)
  const [regeneratingIds, setRegeneratingIds] = useState<Set<number>>(new Set())
  const [imageVersions, setImageVersions] = useState<Record<number, number>>({})
  const tapCountsRef = useRef<Map<number, { count: number; timer: ReturnType<typeof setTimeout> }>>(new Map())

  const weekOf = getCurrentWeekOf()

  async function loadData() {
    if (!user?.householdId) return
    const data = await mealService.library(user.householdId)
    setLibrary(data)
  }

  useEffect(() => {
    loadData().catch(console.error)
  }, [user?.householdId])

  const filtered = library
    .filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === CATEGORY_ALL
        || (activeCategory === CATEGORY_FAVORITES ? m.isFavorited : m.tags.includes(MEAL_CATEGORY_TAG_MAP[activeCategory]))
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (a.isFavorited === b.isFavorited) return 0
      return a.isFavorited ? -1 : 1
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
    setConfirmDeleteMeal(null)
    setLibrary(prev => prev.filter(m => m.id !== meal.id))
    try {
      await mealService.removeFromLibrary(meal.id)
      toast.success(`${meal.name} removed from library`)
    } catch {
      setLibrary(prev => [...prev, meal])
      toast.error('Failed to remove meal.')
    }
  }

  function handleImageTap(meal: LibraryMeal) {
    const entry = tapCountsRef.current.get(meal.id) ?? { count: 0, timer: undefined as ReturnType<typeof setTimeout> | undefined }
    clearTimeout(entry.timer)
    const newCount = entry.count + 1
    if (newCount >= IMAGE_REGEN_TAP_COUNT) {
      tapCountsRef.current.delete(meal.id)
      setConfirmRegenerateMeal(meal)
    } else {
      const timer = setTimeout(() => tapCountsRef.current.delete(meal.id), IMAGE_REGEN_TAP_RESET_MS)
      tapCountsRef.current.set(meal.id, { count: newCount, timer })
    }
  }

  async function regenerateImage(meal: LibraryMeal) {
    setConfirmRegenerateMeal(null)
    setRegeneratingIds(prev => new Set(prev).add(meal.id))
    try {
      await mealService.regenerateImage(meal.id)
      setImageVersions(prev => ({ ...prev, [meal.id]: (prev[meal.id] ?? 0) + 1 }))
      setLibrary(prev => prev.map(m => m.id === meal.id ? { ...m, hasImage: true } : m))
      toast.success(`Image regenerated for ${meal.name}`)
    } catch {
      toast.error('Failed to regenerate image.')
    } finally {
      setRegeneratingIds(prev => { const next = new Set(prev); next.delete(meal.id); return next })
    }
  }

  async function toggleFavorite(meal: LibraryMeal) {
    const newFavorited = !meal.isFavorited
    setLibrary(prev => prev.map(m => m.id === meal.id ? { ...m, isFavorited: newFavorited } : m))
    try {
      if (newFavorited) {
        await mealService.favoriteMeal(meal.id)
      } else {
        await mealService.unfavoriteMeal(meal.id)
      }
    } catch {
      setLibrary(prev => prev.map(m => m.id === meal.id ? { ...m, isFavorited: meal.isFavorited } : m))
      toast.error('Failed to update favorite.')
    }
  }

  return (
    <Layout title="Meal Library" focusMode onRefresh={loadData}>
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
                {/* Image / color block — triple-tap to regenerate image */}
                <div className="h-48 relative overflow-hidden" onClick={() => handleImageTap(meal)}>
                  {meal.hasImage ? (
                    <img
                      src={`${mealImageUrl(meal.id)}${imageVersions[meal.id] ? `?v=${imageVersions[meal.id]}` : ''}`}
                      alt={meal.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      crossOrigin="use-credentials"
                    />
                  ) : (
                    <div className={`h-full bg-linear-to-br ${MEAL_CARD_COLORS[i % MEAL_CARD_COLORS.length]} flex items-center justify-center`}>
                      <span className="font-headline font-black text-8xl text-on-surface/20 select-none">
                        {meal.name[0]}
                      </span>
                    </div>
                  )}
                  {regeneratingIds.has(meal.id) && (
                    <div className="absolute inset-0 bg-on-surface/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-4xl animate-spin">progress_activity</span>
                    </div>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); setConfirmDeleteMeal(meal) }}
                    className="absolute top-5 left-5 w-9 h-9 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-on-surface-variant hover:text-error transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); toggleFavorite(meal) }}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center transition-colors active:scale-90"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${meal.isFavorited ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                      style={meal.isFavorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {meal.isFavorited ? "heart_check" : "heart_plus"}
                    </span>
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

      {confirmRegenerateMeal && (
        <div
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-60 flex items-end justify-center"
          onClick={() => setConfirmRegenerateMeal(null)}
        >
          <div
            className="bg-surface rounded-t-xl w-full max-w-xl shadow-2xl p-8 flex flex-col gap-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full" />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <h3 className="font-headline text-xl font-bold text-on-surface">Regenerate Image?</h3>
              <p className="text-sm text-on-surface-variant">
                Generate a new AI image for <span className="font-semibold text-on-surface">"{confirmRegenerateMeal.name}"</span>? This may take a moment.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => regenerateImage(confirmRegenerateMeal)}
                className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold active:scale-[0.98] transition-all"
              >
                Regenerate
              </button>
              <button
                onClick={() => setConfirmRegenerateMeal(null)}
                className="w-full py-3.5 rounded-xl bg-surface-container font-bold text-on-surface active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteMeal && (
        <div
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-60 flex items-end justify-center"
          onClick={() => setConfirmDeleteMeal(null)}
        >
          <div
            className="bg-surface rounded-t-xl w-full max-w-xl shadow-2xl p-8 flex flex-col gap-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full" />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <h3 className="font-headline text-xl font-bold text-on-surface">Delete Meal?</h3>
              <p className="text-sm text-on-surface-variant">
                Remove <span className="font-semibold text-on-surface">"{confirmDeleteMeal.name}"</span> from your library? This can't be undone.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => removeFromLibrary(confirmDeleteMeal)}
                className="w-full py-3.5 rounded-xl bg-error text-on-error font-bold active:scale-[0.98] transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDeleteMeal(null)}
                className="w-full py-3.5 rounded-xl bg-surface-container font-bold text-on-surface active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
