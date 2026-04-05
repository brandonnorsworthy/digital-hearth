import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProtectedRoute from '../../components/ProtectedRoute'
import type { User } from '../../types/api'

const mockUser: User = { id: '1', username: 'Sarah', householdId: '1' }

vi.mock('../../pages/Login', () => ({
  default: () => <div>Login Page</div>,
}))

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../../contexts/AuthContext'

function renderRoute(children = <div>Protected Content</div>) {
  return render(
    <MemoryRouter>
      <ProtectedRoute>{children}</ProtectedRoute>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('shows a spinner while loading', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isLoading: true, login: vi.fn(), logout: vi.fn(), createHousehold: vi.fn() })
    renderRoute()
    expect(screen.getByText('progress_activity')).toBeInTheDocument()
  })

  it('renders the Login page when user is null and not loading', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isLoading: false, login: vi.fn(), logout: vi.fn(), createHousehold: vi.fn() })
    renderRoute()
    expect(screen.getByText('Login Page')).toBeInTheDocument()
  })

  it('renders children when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({ user: mockUser, isLoading: false, login: vi.fn(), logout: vi.fn(), createHousehold: vi.fn() })
    renderRoute(<div>Protected Content</div>)
    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('does not render children while loading', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isLoading: true, login: vi.fn(), logout: vi.fn(), createHousehold: vi.fn() })
    renderRoute(<div>Protected Content</div>)
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})
