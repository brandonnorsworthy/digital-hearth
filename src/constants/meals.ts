export const MEAL_CARD_COLORS = [
  'from-primary-container to-primary-container/60',
  'from-secondary-container to-secondary-container/60',
  'from-tertiary-container/80 to-tertiary-container/40',
  'from-surface-container-high to-surface-container',
] as const

export const MEAL_CATEGORIES = [
  'All Meals',
  'Favorites',
  'Vegetarian',
  'Family Favorites',
] as const

/** Maps each category chip label to the tag string stored on the backend. */
export const MEAL_CATEGORY_TAG_MAP: Record<string, string> = {
  'Vegetarian': 'vegetarian',
  'Family Favorites': 'family-favorites',
}
