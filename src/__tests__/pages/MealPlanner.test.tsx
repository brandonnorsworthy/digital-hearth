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

  it('calls mealService.removeWeekly when remove button is clicked', async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([makeWeeklyMeal({ id: 5, name: 'Pasta' })])
    vi.mocked(mealService.removeWeekly).mockResolvedValue(undefined)
    renderPage()

    await waitFor(() => screen.getByText('Pasta'))

    // The remove button for a non-library meal has a "delete" icon
    const deleteButtons = screen.getAllByRole('button').filter(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'delete',
    )
    await userEvent.click(deleteButtons[0])
    expect(mealService.removeWeekly).toHaveBeenCalledWith(5)
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
})
