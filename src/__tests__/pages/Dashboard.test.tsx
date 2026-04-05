import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import type { Task, WeeklyMeal } from '../../types/api'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', username: 'Sarah', householdId: '1' }, isLoading: false, logout: vi.fn() }),
}))

vi.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({ success: vi.fn(), error: vi.fn(), info: vi.fn() }),
}))

vi.mock('../../services/tasks', () => ({
  taskService: {
    list: vi.fn(),
    complete: vi.fn(),
  },
}))

vi.mock('../../services/meals', () => ({
  mealService: {
    weeklyList: vi.fn(),
  },
}))

import { taskService } from '../../services/tasks'
import { mealService } from '../../services/meals'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    householdId: '1',
    name: 'Vacuum',
    intervalDays: 3,
    lastCompletedAt: null,
    lastCompletedBy: null,
    nextDueAt: new Date(Date.now() + 1 * 86_400_000).toISOString(),
    ...overrides,
  }
}

function makeWeeklyMeal(overrides: Partial<WeeklyMeal> = {}): WeeklyMeal {
  return {
    id: '1',
    weekOf: '2026-03-23',
    name: 'Spaghetti Bolognese',
    mealLibraryId: null,
    isFromLibrary: false,
    hasImage: false,
    imageGuid: null,
    ...overrides,
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.mocked(taskService.list).mockResolvedValue([])
  vi.mocked(mealService.weeklyList).mockResolvedValue([])
})

describe('Dashboard', () => {
  it('renders a greeting with the username', async () => {
    renderPage()
    await waitFor(() => {
      expect(screen.getByText(/Sarah/)).toBeInTheDocument()
    })
  })

  it('renders the "View meal planner →" button', async () => {
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('View meal planner →')).toBeInTheDocument()
    })
  })

  it("renders tonight's dinner name when a meal is present", async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([makeWeeklyMeal()])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Spaghetti Bolognese')).toBeInTheDocument()
    })
  })

  it('shows "Nothing planned" when no weekly meals exist', async () => {
    vi.mocked(mealService.weeklyList).mockResolvedValue([])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Nothing planned')).toBeInTheDocument()
    })
  })

  describe('Tasks at a Glance', () => {
    it('renders incomplete task names', async () => {
      vi.mocked(taskService.list).mockResolvedValue([
        makeTask({ id: '1', name: 'Vacuum', lastCompletedAt: null }),
      ])
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('Vacuum')).toBeInTheDocument()
      })
    })

    it('does not render already-completed tasks', async () => {
      vi.mocked(taskService.list).mockResolvedValue([
        makeTask({
          id: '1',
          name: 'Already Done',
          lastCompletedAt: new Date(Date.now() - 1 * 86_400_000).toISOString(),
          nextDueAt: new Date(Date.now() + 6 * 86_400_000).toISOString(),
        }),
      ])
      renderPage()
      await waitFor(() => {
        expect(screen.queryByText('Already Done')).not.toBeInTheDocument()
      })
    })

    it('shows at most 3 incomplete tasks', async () => {
      vi.mocked(taskService.list).mockResolvedValue([
        makeTask({ id: '1', name: 'Task One', lastCompletedAt: null }),
        makeTask({ id: '2', name: 'Task Two', lastCompletedAt: null }),
        makeTask({ id: '3', name: 'Task Three', lastCompletedAt: null }),
        makeTask({ id: '4', name: 'Task Four', lastCompletedAt: null }),
      ])
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('Task One')).toBeInTheDocument()
        expect(screen.getByText('Task Two')).toBeInTheDocument()
        expect(screen.getByText('Task Three')).toBeInTheDocument()
        expect(screen.queryByText('Task Four')).not.toBeInTheDocument()
      })
    })

    it('shows a due date badge for each glance task', async () => {
      vi.mocked(taskService.list).mockResolvedValue([
        makeTask({ id: '1', name: 'Vacuum', nextDueAt: new Date(Date.now()).toISOString() }),
      ])
      renderPage()
      await waitFor(() => {
        expect(screen.getByText('Due Today')).toBeInTheDocument()
      })
    })

    it('renders no task cards when all tasks are completed', async () => {
      vi.mocked(taskService.list).mockResolvedValue([
        makeTask({
          id: '1',
          name: 'Done Task',
          lastCompletedAt: new Date(Date.now() - 1 * 86_400_000).toISOString(),
          nextDueAt: new Date(Date.now() + 6 * 86_400_000).toISOString(),
        }),
      ])
      renderPage()
      await waitFor(() => {
        expect(screen.queryByText('Done Task')).not.toBeInTheDocument()
      })
    })
  })
})
