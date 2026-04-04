import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Settings from '../../pages/Settings'

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
    household: { id: 1, name: 'The Smiths', joinCode: 'ABC123', weekResetDay: 'Monday' },
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

  it('shows a toast when invite code is copied', async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /invite code/i }))
    await vi.waitFor(() => expect(mockToastSuccess).toHaveBeenCalledWith('Invite code copied to clipboard'))
  })
})
