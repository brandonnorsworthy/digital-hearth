import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Settings from '../../pages/Settings'
import { notificationService } from '../../services/notifications'
import { authService } from '../../services/auth'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 1, username: 'Sarah', householdId: 1 },
    isLoading: false,
    logout: vi.fn().mockResolvedValue(undefined),
  }),
}))

vi.mock('../../contexts/HouseholdContext', () => ({
  useHousehold: () => ({
    household: { id: 1, name: 'The Smiths', joinCode: 'ABC123', weekResetDay: 'Monday', goalMealsPerWeek: 5 },
    members: [
      { id: 1, username: 'Sarah', role: 'admin' },
      { id: 2, username: 'John', role: 'member' },
    ],
    isLoading: false,
    error: null,
    reload: vi.fn(),
  }),
}))

vi.mock('../../services/household', () => ({
  householdService: {
    update: vi.fn().mockResolvedValue({}),
  },
}))

vi.mock('../../services/notifications', () => ({
  notificationService: {
    vapidPublicKey: vi.fn(),
    subscribe: vi.fn(),
    unsubscribe: vi.fn(),
    getUserNotifSettings: vi.fn(),
    updateUserNotifSettings: vi.fn(),
  },
}))

vi.mock('../../services/auth', () => ({
  authService: {
    changePin: vi.fn(),
  },
}))

const mockToastSuccess = vi.fn()
vi.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({ success: mockToastSuccess, error: vi.fn() }),
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <Settings />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  vi.mocked(notificationService.getUserNotifSettings).mockResolvedValue({
    taskReminderHour: null,
    mediumTermDaysAhead: null,
    mealPlannerNotifs: true,
    shortTermTaskNotifs: true,
    mediumTermTaskNotifs: true,
    longTermTaskNotifs: true,
    taskCompletedNotifs: false,
  })
  vi.mocked(notificationService.updateUserNotifSettings).mockResolvedValue(undefined)
  vi.mocked(authService.changePin).mockResolvedValue(undefined)
})

describe('Settings', () => {
  it('renders member usernames', () => {
    renderPage()
    expect(screen.getByText('Sarah')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  it('shows "YOU" badge on the current user\'s member row', () => {
    renderPage()
    expect(screen.getByText('YOU')).toBeInTheDocument()
  })

  it('shows the household join code', () => {
    renderPage()
    expect(screen.getByText('ABC123')).toBeInTheDocument()
  })

  it('shows the week reset day', () => {
    renderPage()
    expect(screen.getByText('Monday')).toBeInTheDocument()
  })

  it('renders the Sign Out button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
  })

  it('renders the goal meals per week input pre-filled from household', () => {
    renderPage()
    const input = screen.getAllByRole('spinbutton').find(el => (el as HTMLInputElement).max === '14')!
    expect(input).toHaveValue(5)
  })

  it('calls householdService.update with goalMealsPerWeek on blur', async () => {
    const { householdService } = await import('../../services/household')
    renderPage()
    const input = screen.getAllByRole('spinbutton').find(el => (el as HTMLInputElement).max === '14')!
    fireEvent.change(input, { target: { value: '7' } })
    fireEvent.blur(input)
    await vi.waitFor(() =>
      expect(householdService.update).toHaveBeenCalledWith(1, { goalMealsPerWeek: 7 })
    )
  })

  it('shows a toast when invite code is copied', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /invite code/i }))
    await vi.waitFor(() => expect(mockToastSuccess).toHaveBeenCalledWith('Invite code copied to clipboard'))
  })

  it('renders the Change Access PIN button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /change access pin/i })).toBeInTheDocument()
  })

  it('opens the Change PIN modal when the button is clicked', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: /change access pin/i }))
    expect(screen.getByRole('heading', { name: 'Change Access PIN' })).toBeInTheDocument()
    expect(screen.getByLabelText('Current PIN')).toBeInTheDocument()
    expect(screen.getByLabelText('New PIN')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm New PIN')).toBeInTheDocument()
  })

  it('shows an error when new PIN is not 4 digits', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: /change access pin/i }))
    await userEvent.type(screen.getByLabelText('Current PIN'), '1234')
    await userEvent.type(screen.getByLabelText('New PIN'), '123')
    await userEvent.type(screen.getByLabelText('Confirm New PIN'), '123')
    await userEvent.click(screen.getByRole('button', { name: /update pin/i }))
    expect(screen.getByText(/must be exactly 4 digits/i)).toBeInTheDocument()
    expect(authService.changePin).not.toHaveBeenCalled()
  })

  it('shows an error when new PINs do not match', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: /change access pin/i }))
    await userEvent.type(screen.getByLabelText('Current PIN'), '1234')
    await userEvent.type(screen.getByLabelText('New PIN'), '5678')
    await userEvent.type(screen.getByLabelText('Confirm New PIN'), '9999')
    await userEvent.click(screen.getByRole('button', { name: /update pin/i }))
    expect(screen.getByText(/pins do not match/i)).toBeInTheDocument()
    expect(authService.changePin).not.toHaveBeenCalled()
  })

  it('calls authService.changePin and shows success toast on valid submission', async () => {
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: /change access pin/i }))
    await userEvent.type(screen.getByLabelText('Current PIN'), '1234')
    await userEvent.type(screen.getByLabelText('New PIN'), '5678')
    await userEvent.type(screen.getByLabelText('Confirm New PIN'), '5678')
    await userEvent.click(screen.getByRole('button', { name: /update pin/i }))
    await waitFor(() => expect(authService.changePin).toHaveBeenCalledWith('1234', '5678'))
    await waitFor(() => expect(mockToastSuccess).toHaveBeenCalledWith('PIN updated successfully'))
  })

  it('shows an error when authService.changePin rejects', async () => {
    vi.mocked(authService.changePin).mockRejectedValue(new Error('Unauthorized'))
    renderPage()
    await userEvent.click(screen.getByRole('button', { name: /change access pin/i }))
    await userEvent.type(screen.getByLabelText('Current PIN'), 'wrong')
    await userEvent.type(screen.getByLabelText('New PIN'), '5678')
    await userEvent.type(screen.getByLabelText('Confirm New PIN'), '5678')
    await userEvent.click(screen.getByRole('button', { name: /update pin/i }))
    await waitFor(() => expect(screen.getByText(/current pin is incorrect/i)).toBeInTheDocument())
  })
})
