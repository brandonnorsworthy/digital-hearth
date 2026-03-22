import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TaskLibrary from '../../pages/TaskLibrary'
import type { Task } from '../../types/api'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 1, username: 'Sarah', householdId: 1 }, isLoading: false, logout: vi.fn() }),
}))

vi.mock('../../services/tasks', () => ({
  taskService: {
    list: vi.fn(),
  },
}))

import { taskService } from '../../services/tasks'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 1,
    householdId: 1,
    name: 'Vacuum',
    intervalDays: 3,
    lastCompletedAt: null,
    lastCompletedBy: null,
    nextDueAt: new Date(Date.now() + 2 * 86_400_000).toISOString(),
    ...overrides,
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <TaskLibrary />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.mocked(taskService.list).mockResolvedValue([])
  mockNavigate.mockReset()
})

describe('TaskLibrary', () => {
  it('renders "Short Term" section for short-interval tasks', async () => {
    vi.mocked(taskService.list).mockResolvedValue([makeTask({ intervalDays: 3, name: 'Vacuum' })])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Short Term')).toBeInTheDocument()
    })
  })

  it('renders "Medium Term" section for medium-interval tasks', async () => {
    vi.mocked(taskService.list).mockResolvedValue([makeTask({ intervalDays: 14, name: 'Clean gutters' })])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Medium Term')).toBeInTheDocument()
    })
  })

  it('renders "Long Term" section for long-interval tasks', async () => {
    vi.mocked(taskService.list).mockResolvedValue([makeTask({ intervalDays: 180, name: 'Paint fence' })])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Long Term')).toBeInTheDocument()
    })
  })

  it('filters task names by search input', async () => {
    vi.mocked(taskService.list).mockResolvedValue([
      makeTask({ id: 1, name: 'Vacuum', intervalDays: 3 }),
      makeTask({ id: 2, name: 'Mop floors', intervalDays: 5 }),
    ])
    renderPage()
    await waitFor(() => screen.getByText('Vacuum'))

    await userEvent.type(screen.getByPlaceholderText('Search tasks...'), 'mop')

    expect(screen.queryByText('Vacuum')).not.toBeInTheDocument()
    expect(screen.getByText('Mop floors')).toBeInTheDocument()
  })

  it('navigates to /tasks/:id when a task row is clicked', async () => {
    vi.mocked(taskService.list).mockResolvedValue([makeTask({ id: 7, name: 'Vacuum', intervalDays: 3 })])
    renderPage()
    await waitFor(() => screen.getByText('Vacuum'))

    await userEvent.click(screen.getByText('Vacuum'))
    expect(mockNavigate).toHaveBeenCalledWith('/tasks/7')
  })

  it('shows "No results" when search has no matches', async () => {
    vi.mocked(taskService.list).mockResolvedValue([makeTask({ name: 'Vacuum', intervalDays: 3 })])
    renderPage()
    await waitFor(() => screen.getByText('Vacuum'))

    await userEvent.type(screen.getByPlaceholderText('Search tasks...'), 'zzz')

    expect(screen.getByText('No results')).toBeInTheDocument()
  })
})
