import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup({ delay: null })
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
    user: { id: '1', username: 'Sarah', householdId: '1' },
    isLoading: false,
    logout: vi.fn().mockResolvedValue(undefined),
  }),
}))

vi.mock('../../contexts/HouseholdContext', () => ({
  useHousehold: () => ({
    household: { id: '1', name: 'The Smiths', joinCode: 'ABC123', joinCodeExpiresAt: new Date(Date.now() + 86400000).toISOString(), weekResetDay: 'Monday', goalMealsPerWeek: 5 },
    members: [
      { id: '1', username: 'Sarah', role: 'admin' },
      { id: '2', username: 'John', role: 'member' },
    ],
    isLoading: false,
    error: null,
    reload: vi.fn(),
  }),
}))

vi.mock('../../services/household', () => ({
  householdService: {
    update: vi.fn().mockResolvedValue({}),
    regenerateJoinCode: vi.fn().mockResolvedValue({}),
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
    changePassword: vi.fn(),
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
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

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
  vi.mocked(authService.changePassword).mockResolvedValue(undefined)
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
      expect(householdService.update).toHaveBeenCalledWith('1', { goalMealsPerWeek: 7 })
    )
  })

  it('shows a toast when invite code is copied', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockResolvedValue(undefined) }, configurable: true })
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /invite code/i }))
    await vi.waitFor(() => expect(mockToastSuccess).toHaveBeenCalledWith('Invite code copied to clipboard'))
  })

  it('renders the Change Password button', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument()
  })

  it('opens the Change Password modal when the button is clicked', async () => {
    renderPage()
    await user.click(screen.getByRole('button', { name: /change password/i }))
    expect(screen.getByRole('heading', { name: 'Change Password' })).toBeInTheDocument()
    expect(screen.getByLabelText('Current Password')).toBeInTheDocument()
    expect(screen.getByLabelText('New Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument()
  })

  it('shows a validation error when new password is too weak', async () => {
    renderPage()
    await user.click(screen.getByRole('button', { name: /change password/i }))
    await user.type(screen.getByLabelText('Current Password'), 'OldPass1!')
    await user.type(screen.getByLabelText('New Password'), 'weak')
    await user.type(screen.getByLabelText('Confirm New Password'), 'weak')
    await user.click(screen.getByRole('button', { name: /update password/i }))
    expect(screen.getByText(/password must/i)).toBeInTheDocument()
    expect(authService.changePassword).not.toHaveBeenCalled()
  })

  it('shows an error when new passwords do not match', async () => {
    renderPage()
    await user.click(screen.getByRole('button', { name: /change password/i }))
    await user.type(screen.getByLabelText('Current Password'), 'OldPass1!abc')
    await user.type(screen.getByLabelText('New Password'), 'NewPass1!abc')
    await user.type(screen.getByLabelText('Confirm New Password'), 'DiffPass1!abc')
    await user.click(screen.getByRole('button', { name: /update password/i }))
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    expect(authService.changePassword).not.toHaveBeenCalled()
  })

  it('calls authService.changePassword and shows success toast on valid submission', async () => {
    renderPage()
    await user.click(screen.getByRole('button', { name: /change password/i }))
    await user.type(screen.getByLabelText('Current Password'), 'OldPass1!')
    await user.type(screen.getByLabelText('New Password'), 'NewPass2!abc')
    await user.type(screen.getByLabelText('Confirm New Password'), 'NewPass2!abc')
    await user.click(screen.getByRole('button', { name: /update password/i }))
    await waitFor(() => expect(authService.changePassword).toHaveBeenCalledWith('OldPass1!', 'NewPass2!abc'))
    await waitFor(() => expect(mockToastSuccess).toHaveBeenCalledWith('Password updated successfully'))
  })

  it('shows an error when authService.changePassword rejects', async () => {
    vi.mocked(authService.changePassword).mockRejectedValue(new Error('Unauthorized'))
    renderPage()
    await user.click(screen.getByRole('button', { name: /change password/i }))
    await user.type(screen.getByLabelText('Current Password'), 'wrong')
    await user.type(screen.getByLabelText('New Password'), 'NewPass2!abc')
    await user.type(screen.getByLabelText('Confirm New Password'), 'NewPass2!abc')
    await user.click(screen.getByRole('button', { name: /update password/i }))
    await waitFor(() => expect(screen.getByText(/current password is incorrect/i)).toBeInTheDocument())
  })
})
