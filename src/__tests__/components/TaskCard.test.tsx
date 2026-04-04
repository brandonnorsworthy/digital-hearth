import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TaskCard from '../../components/TaskCard'
import type { Task } from '../../types/api'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 1,
    householdId: 1,
    name: 'Clean the kitchen',
    intervalDays: 3,
    lastCompletedAt: null,
    lastCompletedBy: null,
    nextDueAt: new Date(Date.now() + 2 * 86_400_000).toISOString(),
    ...overrides,
  }
}

function renderCard(task: Task, onComplete = vi.fn(), completing = false) {
  return render(
    <MemoryRouter>
      <TaskCard task={task} onComplete={onComplete} completing={completing} />
    </MemoryRouter>,
  )
}

describe('TaskCard', () => {
  it('renders the task name', () => {
    renderCard(makeTask())
    expect(screen.getByText('Clean the kitchen')).toBeInTheDocument()
  })

  it('renders the interval frequency label', () => {
    renderCard(makeTask({ intervalDays: 7 }))
    expect(screen.getByText(/Every/)).toBeInTheDocument()
  })

  it('shows "Complete Task" button when not completing', () => {
    renderCard(makeTask(), vi.fn(), false)
    expect(screen.getByRole('button', { name: /complete task/i })).toBeInTheDocument()
  })

  it('shows "Completed" and disables the button when completing', () => {
    renderCard(makeTask(), vi.fn(), true)
    const btn = screen.getByRole('button', { name: /completed/i })
    expect(btn).toBeDisabled()
  })

  it('applies opacity-60 to the card when completing', () => {
    const { container } = renderCard(makeTask(), vi.fn(), true)
    // The card div is the first element inside the MemoryRouter wrapper
    const card = container.querySelector('[class*="opacity-60"]')
    expect(card).toBeInTheDocument()
  })

  it('calls onComplete when Complete Task button is clicked', async () => {
    const onComplete = vi.fn()
    renderCard(makeTask(), onComplete, false)
    await userEvent.click(screen.getByRole('button', { name: /complete task/i }))
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('does not navigate when card body is clicked', async () => {
    renderCard(makeTask({ id: 5 }), vi.fn(), false)
    await userEvent.click(screen.getByText('Clean the kitchen'))
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
