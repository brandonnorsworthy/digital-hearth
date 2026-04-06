import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MediumTaskCard from '../../components/MediumTaskCard'
import type { Task } from '../../types/api'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: '2',
    householdId: '1',
    name: 'Deep clean bathroom',
    intervalDays: 14,
    isOneTime: false,
    lastCompletedAt: null,
    lastCompletedBy: null,
    nextDueAt: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    ...overrides,
  }
}

function renderCard(task: Task, onComplete = vi.fn(), completing = false) {
  return render(
    <MemoryRouter>
      <MediumTaskCard task={task} onComplete={onComplete} completing={completing} />
    </MemoryRouter>,
  )
}

describe('MediumTaskCard', () => {
  it('renders the task name', () => {
    renderCard(makeTask())
    expect(screen.getByText('Deep clean bathroom')).toBeInTheDocument()
  })

  it('shows "Mark Done" button when not completing', () => {
    renderCard(makeTask(), vi.fn(), false)
    expect(screen.getByRole('button', { name: /mark done/i })).toBeInTheDocument()
  })

  it('shows "Completed" and disables button when completing', () => {
    renderCard(makeTask(), vi.fn(), true)
    const btn = screen.getByRole('button', { name: /completed/i })
    expect(btn).toBeDisabled()
  })

  it('shows last completed history line when lastCompletedAt is set and not completing', () => {
    renderCard(makeTask({ lastCompletedAt: '2026-03-10T12:00:00Z', lastCompletedBy: 'Sarah' }), vi.fn(), false)
    expect(screen.getByText(/Last:/)).toBeInTheDocument()
    expect(screen.getByText(/by Sarah/)).toBeInTheDocument()
  })

  it('hides history line when completing', () => {
    renderCard(makeTask({ lastCompletedAt: '2026-03-10T12:00:00Z' }), vi.fn(), true)
    expect(screen.queryByText(/Last:/)).not.toBeInTheDocument()
  })

  it('calls onComplete when Mark Done button is clicked', async () => {
    const onComplete = vi.fn()
    renderCard(makeTask(), onComplete, false)
    await userEvent.click(screen.getByRole('button', { name: /mark done/i }))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('navigates to /tasks/:id when card is clicked', async () => {
    renderCard(makeTask({ id: '7' }), vi.fn(), false)
    await userEvent.click(screen.getByText('Deep clean bathroom'))
    expect(mockNavigate).toHaveBeenCalledWith('/tasks/7')
  })
})
