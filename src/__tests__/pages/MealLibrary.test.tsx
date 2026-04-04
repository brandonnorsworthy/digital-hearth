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
    favoriteMeal: vi.fn(),
    unfavoriteMeal: vi.fn(),
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
    isFavorited: false,
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
  vi.clearAllMocks()
  vi.mocked(mealService.library).mockResolvedValue([])
  vi.mocked(mealService.addWeekly).mockResolvedValue({} as any)
  vi.mocked(mealService.removeFromLibrary).mockResolvedValue(undefined)
  vi.mocked(mealService.favoriteMeal).mockResolvedValue(undefined)
  vi.mocked(mealService.unfavoriteMeal).mockResolvedValue(undefined)
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

  it('shows a confirmation modal when delete is clicked', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 3, name: 'Chicken Tikka' })])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    const deleteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'delete',
    )!
    await userEvent.click(deleteBtn)

    expect(screen.getByRole('heading', { name: 'Delete Meal?' })).toBeInTheDocument()
    expect(screen.getByText(/"Chicken Tikka"/)).toBeInTheDocument()
    expect(mealService.removeFromLibrary).not.toHaveBeenCalled()
  })

  it('calls mealService.removeFromLibrary when Delete is confirmed', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 3, name: 'Chicken Tikka' })])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    const deleteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'delete',
    )!
    await userEvent.click(deleteBtn)
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    await waitFor(() => expect(mealService.removeFromLibrary).toHaveBeenCalledWith(3))
  })

  it('dismisses the confirmation modal without deleting when Cancel is clicked', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 3, name: 'Chicken Tikka' })])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    const deleteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'delete',
    )!
    await userEvent.click(deleteBtn)
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(screen.queryByRole('heading', { name: 'Delete Meal?' })).not.toBeInTheDocument()
    expect(mealService.removeFromLibrary).not.toHaveBeenCalled()
  })

  it('renders a favorite button for each meal', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 1, name: 'Chicken Tikka', isFavorited: false })])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    const favoriteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'heart_plus',
    )
    expect(favoriteBtn).toBeInTheDocument()
  })

  it('calls mealService.favoriteMeal when favoriting an unfavorited meal', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 5, isFavorited: false })])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    const favoriteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'heart_plus',
    )!
    await userEvent.click(favoriteBtn)

    await waitFor(() => expect(mealService.favoriteMeal).toHaveBeenCalledWith(5))
  })

  it('calls mealService.unfavoriteMeal when unfavoriting a favorited meal', async () => {
    vi.mocked(mealService.library).mockResolvedValue([makeLibraryMeal({ id: 5, isFavorited: true })])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    const unfavoriteBtn = screen.getAllByRole('button').find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'heart_check',
    )!
    await userEvent.click(unfavoriteBtn)

    await waitFor(() => expect(mealService.unfavoriteMeal).toHaveBeenCalledWith(5))
  })

  it('shows only favorited meals when Favorites filter is active', async () => {
    vi.mocked(mealService.library).mockResolvedValue([
      makeLibraryMeal({ id: 1, name: 'Chicken Tikka', isFavorited: true }),
      makeLibraryMeal({ id: 2, name: 'Beef Stew', isFavorited: false }),
    ])
    renderPage()
    await waitFor(() => screen.getByText('Chicken Tikka'))

    await userEvent.click(screen.getByRole('button', { name: 'Favorites' }))

    expect(screen.getByText('Chicken Tikka')).toBeInTheDocument()
    expect(screen.queryByText('Beef Stew')).not.toBeInTheDocument()
  })

  it('renders favorited meals before non-favorited meals', async () => {
    vi.mocked(mealService.library).mockResolvedValue([
      makeLibraryMeal({ id: 1, name: 'Beef Stew', isFavorited: false }),
      makeLibraryMeal({ id: 2, name: 'Chicken Tikka', isFavorited: true }),
    ])
    renderPage()
    await waitFor(() => screen.getAllByRole('heading', { level: 3 }))

    const headings = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent)
    expect(headings[0]).toBe('Chicken Tikka')
    expect(headings[1]).toBe('Beef Stew')
  })
})
