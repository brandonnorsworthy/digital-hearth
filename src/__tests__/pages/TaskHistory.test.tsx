import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import TaskHistory from '../../pages/TaskHistory'
import { taskService } from '../../services/tasks'

const user = userEvent.setup({ delay: null })
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: '1', username: 'Sarah', householdId: '1' } }),
}))

vi.mock('../../services/tasks', () => ({
  taskService: {
    list: vi.fn(),
    history: vi.fn(),
  },
}))

const mockTask = {
  id: 'task-1', householdId: '1', name: 'Clean Kitchen',
  intervalDays: 7, lastCompletedAt: null, lastCompletedBy: null, nextDueAt: new Date().toISOString(),
}

const mockHistory = [
  { id: 'c1', taskId: 'task-1', completedAt: '2026-03-01T10:00:00Z', userId: '1', username: 'Sarah' },
  { id: 'c2', taskId: 'task-1', completedAt: '2026-02-22T14:30:00Z', userId: '2', username: 'John' },
]

beforeEach(() => {
  vi.mocked(taskService.list).mockResolvedValue([mockTask])
  vi.mocked(taskService.history).mockResolvedValue(mockHistory)
  mockNavigate.mockReset()
})

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/tasks/task-1/history']}>
      <Routes>
        <Route path="/tasks/:id/history" element={<TaskHistory />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('TaskHistory', () => {
  it('shows the task name as the header', async () => {
    renderPage()
    await waitFor(() => expect(screen.getByText('Clean Kitchen')).toBeInTheDocument())
  })

  it('renders a row for each completion entry', async () => {
    renderPage()
    await waitFor(() => {
      expect(screen.getByText('Sarah')).toBeInTheDocument()
      expect(screen.getByText('John')).toBeInTheDocument()
    })
  })

  it('shows an empty state when there are no completions', async () => {
    vi.mocked(taskService.history).mockResolvedValue([])
    renderPage()
    await waitFor(() =>
      expect(screen.getByText("No completions yet")).toBeInTheDocument()
    )
  })

  it('calls navigate(-1) when Back to Task is clicked', async () => {
    renderPage()
    await waitFor(() => screen.getByText('Clean Kitchen'))
    await user.click(screen.getByRole('button', { name: /back to task/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
