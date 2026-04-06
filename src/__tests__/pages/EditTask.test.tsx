import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import EditTask from '../../pages/EditTask'
import type { Task } from '../../types/api'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate, useParams: () => ({ id: 'new' }) }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', username: 'Sarah', householdId: '1' }, isLoading: false, logout: vi.fn() }),
}))

vi.mock('../../services/tasks', () => ({
  taskService: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

import { taskService } from '../../services/tasks'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '42',
    householdId: '1',
    name: 'Clean gutters',
    intervalDays: 90,
    isOneTime: false,
    lastCompletedAt: null,
    lastCompletedBy: null,
    nextDueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
    ...overrides,
  }
}

function renderPage() {
  return render(
    <MemoryRouter>
      <EditTask />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.mocked(taskService.list).mockResolvedValue([makeTask()])
  vi.mocked(taskService.create).mockResolvedValue(makeTask({ id: '99', name: 'New Task' }))
  vi.mocked(taskService.update).mockResolvedValue(makeTask())
  vi.mocked(taskService.delete).mockResolvedValue(undefined)
  mockNavigate.mockReset()
})

describe('EditTask — new task (id="new")', () => {
  it('renders "Add Household Task" heading', () => {
    renderPage()
    // The heading is split across two text nodes: "Add Household" + "\u00a0Task"
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Add Household')
  })

  it('renders an empty name input', () => {
    renderPage()
    const input = screen.getByPlaceholderText('What needs to be done?')
    expect(input).toHaveValue('')
  })

  it('renders "Add Task" button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument()
  })

  it('calls taskService.create with name when Add Task is clicked', async () => {
    vi.mocked(taskService.create).mockResolvedValue(makeTask({ id: '99', name: 'Wash windows' }))
    renderPage()

    await userEvent.type(screen.getByPlaceholderText('What needs to be done?'), 'Wash windows')
    await userEvent.click(screen.getByRole('button', { name: /add task/i }))

    await waitFor(() => {
      expect(taskService.create).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({ name: 'Wash windows' }),
      )
    })
  })

  it('shows an error message when save fails', async () => {
    vi.mocked(taskService.create).mockRejectedValue(new Error('Server error'))
    renderPage()

    await userEvent.type(screen.getByPlaceholderText('What needs to be done?'), 'Wash windows')
    await userEvent.click(screen.getByRole('button', { name: /add task/i }))

    await waitFor(() => {
      expect(screen.getByText('Failed to save task. Please try again.')).toBeInTheDocument()
    })
  })
})
