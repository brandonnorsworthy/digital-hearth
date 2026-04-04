import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MealLibrary from '../../pages/MealLibrary'
import type { LibraryMeal } from '../../types/api'

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 1, username: 'Sarah', householdId: 1 }, isLoading: false, logout: vi.fn() }),
}))

vi.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn() }),
}))

vi.mock('../../services/meals', () => ({
  mealService: {
    library: vi.fn(),
    addWeekly: vi.fn(),
    removeFromLibrary: vi.fn(),
  },
}))

import { mealService } from '../../services/meals'

function makeLibraryMeal(overrides: Partial<LibraryMeal> = {}): LibraryMeal {
  return {
    id: 1,
    name: 'Chicken Tikka',
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
      <MealLibrary />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.mocked(mealService.library).mockResolvedValue([])
  vi.mocked(mealService.addWeekly).mockResolvedValue({} as any)
  vi.mocked(mealService.removeFromLibrary).mockResolvedValue(undefined)
})

describe('MealLibrary', () => {
  it('renders library meal names', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ name: 'Chicken Tikka' })])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Chicken Tikka')).toBeInTheDocument()
    })
  })

  it('shows empty state message when library is empty', async () => {
    vi.mocked(mealService.library).mockResolvedValue([])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Your library is empty')).toBeInTheDocument()
    })
  })

  it('filters meals by search input', async () => {
    vi.mocked(mealService.library).mockResolvedValue([
      makeLibraryMeal({ id: 1, name: 'Chicken Tikka' }),
      makeLibraryMeal({ id: 2, name: 'Beef Stew' }),
    ])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    await userEvent.type(screen.getByPlaceholderText('Search by meal name...'), 'chicken')

    expect(screen.getByText('Chicken Tikka')).toBeInTheDocument()
    expect(screen.queryByText('Beef Stew')).not.toBeInTheDocument()
  })

  it('calls mealService.addWeekly when "Add to Week" is clicked', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 5, name: 'Chicken Tikka' })])
    vi.mocked(mealService.addWeekly).mockResolvedValue({} as any)
    renderPage()
    await waitFor(() => screen.getByRole('button', { name: /add to week/i }))
    await userEvent.click(screen.getByRole('button', { name: /add to week/i }))
    await waitFor(() => {
      expect(mealService.addWeekly).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ mealLibraryId: 5 }),
      )
    })
  })

  it('shows "No matches found" when search yields no results', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ name: 'Beef Stew' })])
    renderPage()
    await waitFor(() => screen.getByText('Beef Stew'))

    await userEvent.type(screen.getByPlaceholderText('Search by meal name...'), 'pizza')

    expect(screen.getByText('No matches found')).toBeInTheDocument()
  })
})
