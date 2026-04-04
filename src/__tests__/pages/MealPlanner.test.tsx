import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MealPlanner from '../../pages/MealPlanner'
import type { WeeklyMeal, LibraryMeal } from '../../types/api'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 1, username: 'Sarah', householdId: 1 }, isLoading: false, logout: vi.fn() }),
}))

vi.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn() }),
}))

vi.mock('../../services/meals', () => ({
  mealService: {
    weeklyList: vi.fn(),
    library: vi.fn(),
    addWeekly: vi.fn(),
    removeWeekly: vi.fn(),
  },
}))

import { mealService } from '../../services/meals'

function makeWeeklyMeal(overrides: Partial<WeeklyMeal> = {}): WeeklyMeal {
  return {
    id: 1,
    weekOf: '2026-03-23',
    name: 'Pasta',
    mealLibraryId: null,
    isFromLibrary: false,
    hasImage: false,
    ...overrides,
  }
}

function makeLibraryMeal(overrides: Partial<LibraryMeal> = {}): LibraryMeal {
  return {
    id: 10,
    name: 'Chicken Curry',
    createdBy: 'Sarah',
    createdAt: '2026-01-01T00:00:00Z',
    tags: [],
    hasImage: false,
    ...overrides,
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <MealPlanner />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(mealService.weeklyList).mockResolvedValue([])
  vi.mocked(mealService.library).mockResolvedValue([])
  vi.mocked(mealService.addWeekly).mockResolvedValue(makeWeeklyMeal())
  vi.mocked(mealService.removeWeekly).mockResolvedValue(undefined)
})

describe('MealPlanner', () => {
  it('renders weekly meal names', async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([makeWeeklyMeal({ name: 'Pasta' })])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Pasta')).toBeInTheDocument()
    })
  })

  it('renders library meal names in the shortcuts section', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ name: 'Chicken Curry' })])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Chicken Curry')).toBeInTheDocument()
    })
  })

  it('calls mealService.addWeekly when typing a name and pressing Enter', async () => {
    vi.mocked(mealService.addWeekly).mockResolvedValue(makeWeeklyMeal({ name: 'Tacos' }))
    renderPage()
    await waitFor(() => screen.getByPlaceholderText('Marry Me Chicken'))

    await userEvent.type(screen.getByPlaceholderText('Marry Me Chicken'), 'Tacos{Enter}')

    await waitFor(() => {
      expect(mealService.addWeekly).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ name: 'Tacos' }),
      )
    })
  })

  it('shows a confirmation modal when the delete button is clicked on a manual entry meal', async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([makeWeeklyMeal({ id: 5, name: 'Pasta', isFromLibrary: false })])
    renderPage()

    await waitFor(() => screen.getByText('Pasta'))

    const deleteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'delete',
    )!
    await userEvent.click(deleteBtn)

    expect(screen.getByRole('heading', { name: 'Remove Meal?' })).toBeInTheDocument()
    expect(screen.getByText(/"Pasta"/)).toBeInTheDocument()
    expect(mealService.removeWeekly).not.toHaveBeenCalled()
  })

  it('calls mealService.removeWeekly when confirmed in the modal', async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([makeWeeklyMeal({ id: 5, name: 'Pasta', isFromLibrary: false })])
    vi.mocked(mealService.removeWeekly).mockResolvedValue(undefined)
    renderPage()

    await waitFor(() => screen.getByText('Pasta'))

    const deleteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'delete',
    )!
    await userEvent.click(deleteBtn)
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }))

    expect(mealService.removeWeekly).toHaveBeenCalledWith(5)
  })

  it('dismisses the confirmation modal without deleting when Cancel is clicked', async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([makeWeeklyMeal({ id: 5, name: 'Pasta', isFromLibrary: false })])
    renderPage()

    await waitFor(() => screen.getByText('Pasta'))

    const deleteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'delete',
    )!
    await userEvent.click(deleteBtn)
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.queryByRole('heading', { name: 'Remove Meal?' })).not.toBeInTheDocument()
    expect(mealService.removeWeekly).not.toHaveBeenCalled()
  })

  it('calls mealService.removeWeekly directly (no modal) when close button is clicked on a library meal', async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([makeWeeklyMeal({ id: 6, name: 'Chicken Curry', isFromLibrary: true, mealLibraryId: 10 })])
    vi.mocked(mealService.removeWeekly).mockResolvedValue(undefined)
    renderPage()

    await waitFor(() => screen.getByText('Chicken Curry'))

    const closeBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'close',
    )!
    await userEvent.click(closeBtn)

    expect(screen.queryByRole('heading', { name: 'Remove Meal?' })).not.toBeInTheDocument()
    expect(mealService.removeWeekly).toHaveBeenCalledWith(6)
  })

  it('calls mealService.addWeekly with libraryId when a library shortcut is clicked', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 10, name: 'Chicken Curry' })])
    vi.mocked(mealService.addWeekly).mockResolvedValue(makeWeeklyMeal({ name: 'Chicken Curry' }))
    renderPage()

    await waitFor(() => screen.getByText('Chicken Curry'))
    await userEvent.click(screen.getByText('Chicken Curry'))

    await waitFor(() => {
      expect(mealService.addWeekly).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ mealLibraryId: 10 }),
      )
    })
  })

  it('renders prev and next week navigation buttons', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Meals for the Week'))
    const buttons = screen.getAllByRole('button')
    const chevronButtons = buttons.filter(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'chevron_left' ||
      btn.querySelector('.material-symbols-outlined')?.textContent === 'chevron_right',
    )
    expect(chevronButtons).toHaveLength(2)
  })

  it('reloads meals with the next week when the forward arrow is clicked', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Meals for the Week'))

    const nextBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'chevron_right',
    )!
    await userEvent.click(nextBtn)

    await waitFor(() => {
      const calls = vi.mocked(mealService.weeklyList).mock.calls
      const weekOfs = calls.map(([, weekOf]) => weekOf)
      expect(weekOfs.some(w => w > weekOfs[0])).toBe(true)
    })
  })

  it('reloads meals with the previous week when the back arrow is clicked', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Meals for the Week'))

    const prevBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'chevron_left',
    )!
    await userEvent.click(prevBtn)

    await waitFor(() => {
      const calls = vi.mocked(mealService.weeklyList).mock.calls
      const weekOfs = calls.map(([, weekOf]) => weekOf)
      expect(weekOfs.some(w => w < weekOfs[0])).toBe(true)
    })
  })
})
