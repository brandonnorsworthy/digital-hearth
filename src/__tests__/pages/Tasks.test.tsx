import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Tasks from '../../pages/Tasks'
import type { Task } from '../../types/api'

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

import { taskService } from '../../services/tasks'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '1',
    householdId: '1',
    name: 'Test Task',
    intervalDays: 3,
    lastCompletedAt: null,
    lastCompletedBy: null,
    nextDueAt: new Date(Date.now() + 1 * 86_400_000).toISOString(),
    ...overrides,
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <Tasks />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.mocked(taskService.list).mockResolvedValue([])
  vi.mocked(taskService.complete).mockResolvedValue(makeTask())
})

describe('Tasks page', () => {
  it('renders "Short Term" heading for short-interval tasks', async () => {
    vi.mocked(taskService.list).mockResolvedValue([
      makeTask({ id: '1', name: 'Vacuum', intervalDays: 3 }),
    ])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Short Term')).toBeInTheDocument()
    })
  })

  it('renders "Medium Term" heading for medium-interval tasks', async () => {
    vi.mocked(taskService.list).mockResolvedValue([
      makeTask({ id: '2', name: 'Clean gutters', intervalDays: 14 }),
    ])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Medium Term')).toBeInTheDocument()
    })
  })

  it('renders "Long Term" heading for long-interval tasks', async () => {
    vi.mocked(taskService.list).mockResolvedValue([
      makeTask({ id: '3', name: 'Paint fence', intervalDays: 180 }),
    ])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Long Term')).toBeInTheDocument()
    })
  })

  it('shows task name in the rendered list', async () => {
    vi.mocked(taskService.list).mockResolvedValue([
      makeTask({ id: '1', name: 'Mow the lawn', intervalDays: 5 }),
    ])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Mow the lawn')).toBeInTheDocument()
    })
  })

  it('calls taskService.complete when Complete Task button is clicked', async () => {
    vi.mocked(taskService.list).mockResolvedValue([
      makeTask({ id: '1', name: 'Vacuum', intervalDays: 3 }),
    ])
    const updatedTask = makeTask({
      id: '1',
      lastCompletedAt: new Date().toISOString(),
      nextDueAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
    })
    vi.mocked(taskService.complete).mockResolvedValue(updatedTask)

    renderPage()
    await waitFor(() => screen.getByRole('button', { name: /complete task/i }))
    await userEvent.click(screen.getByRole('button', { name: /complete task/i }))
    expect(taskService.complete).toHaveBeenCalledWith('1')
  })

  it('shows "All caught up!" when all tasks are done', async () => {
    vi.mocked(taskService.list).mockResolvedValue([
      makeTask({
        id: '1',
        intervalDays: 3,
        lastCompletedAt: new Date().toISOString(),
        nextDueAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
      }),
    ])
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('All caught up!')).toBeInTheDocument()
    })
  })
})
