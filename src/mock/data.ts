export type TaskTier = 'short' | 'medium' | 'long'
export type DueBadgeVariant = 'urgent' | 'soon' | 'ok'

export interface Task {
  id: number
  name: string
  tier: TaskTier
  intervalLabel: string
  dueLabel: string
  dueBadgeVariant: DueBadgeVariant
  progressPct: number
  icon: string
  lastCompletedBy?: string
  lastCompletedDate?: string
  description?: string
}

export interface Meal {
  id: number
  name: string
  source: 'library' | 'manual'
}

export interface LibraryMeal {
  id: number
  name: string
}

export interface Member {
  id: number
  username: string
  role: 'admin' | 'member'
}

export const MOCK_USER = {
  id: 1,
  username: 'Sarah',
  householdId: 1,
}

export const MOCK_HOUSEHOLD = {
  id: 1,
  name: 'The Mitchell House',
  joinCode: 'HEARTH42',
  weekResetDay: 1,
}

export const MOCK_MEMBERS: Member[] = [
  { id: 1, username: 'Sarah', role: 'admin' },
  { id: 2, username: 'James', role: 'member' },
]

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    name: 'Water Indoor Plants',
    tier: 'short',
    intervalLabel: 'Every 1 Week',
    dueLabel: 'Due in 2d',
    dueBadgeVariant: 'soon',
    progressPct: 70,
    icon: 'water_drop',
    description: 'All pots on the windowsill and the monstera.',
  },
  {
    id: 2,
    name: 'Compost Turn',
    tier: 'short',
    intervalLabel: 'Every 1 Week',
    dueLabel: 'Due Today',
    dueBadgeVariant: 'urgent',
    progressPct: 95,
    icon: 'compost',
  },
  {
    id: 3,
    name: 'HVAC Filter Swap',
    tier: 'medium',
    intervalLabel: 'Every 1 Month',
    dueLabel: '12d Left',
    dueBadgeVariant: 'ok',
    progressPct: 60,
    icon: 'air',
    lastCompletedBy: 'Sarah',
    lastCompletedDate: 'June 12',
  },
  {
    id: 4,
    name: 'Deep Clean Gutters',
    tier: 'long',
    intervalLabel: 'Every 6 Months',
    dueLabel: 'Spring / Autumn',
    dueBadgeVariant: 'ok',
    progressPct: 30,
    icon: 'house_siding',
    description: 'Crucial for preventing foundation moisture.',
  },
  {
    id: 5,
    name: 'Smoke Alarm Battery',
    tier: 'long',
    intervalLabel: 'Every 6 Months',
    dueLabel: '12d Left',
    dueBadgeVariant: 'ok',
    progressPct: 85,
    icon: 'smoke_detector',
    lastCompletedBy: 'James',
    lastCompletedDate: 'Sep 21',
  },
]

export const MOCK_WEEKLY_MEALS: Meal[] = [
  { id: 1, name: 'Lemon Garlic Salmon', source: 'library' },
  { id: 2, name: 'Mediterranean Bowls', source: 'library' },
  { id: 3, name: 'Spaghetti Aglio e Olio', source: 'manual' },
]

export const MOCK_LIBRARY: LibraryMeal[] = [
  { id: 1, name: 'BBQ Ribs' },
  { id: 2, name: 'Homemade Pizza' },
  { id: 3, name: 'Garden Bowl' },
  { id: 4, name: 'Marry Me Chicken' },
  { id: 5, name: 'Roasted Tomato Basil' },
]

export const INTERVALS = [
  '3 Days',
  '1 Week',
  '2 Weeks',
  '1 Month',
  '3 Months',
  '6 Months',
  '1 Year',
]
