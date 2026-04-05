import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from '../../pages/Login'

const user = userEvent.setup({ delay: null })

const mockLogin = vi.fn()

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ login: mockLogin, user: null, isLoading: false, logout: vi.fn() }),
}))

beforeEach(() => {
  mockLogin.mockReset()
})

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  )
}

describe('Login', () => {
  it('renders username input, password input, and Sign In button', () => {
    renderLogin()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('calls login with the typed username and password on submit', async () => {
    mockLogin.mockResolvedValue(undefined)
    renderLogin()

    await user.type(screen.getByLabelText('Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'TestPass1!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(mockLogin).toHaveBeenCalledWith('Sarah', 'TestPass1!')
  })

  it('shows an error message when login throws', async () => {
    mockLogin.mockRejectedValue(new Error('bad credentials'))
    renderLogin()

    await user.type(screen.getByLabelText('Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password.')).toBeInTheDocument()
    })
  })

  it('clears the error message on a new submit attempt', async () => {
    mockLogin.mockRejectedValueOnce(new Error('bad credentials')).mockResolvedValueOnce(undefined)
    renderLogin()

    await user.type(screen.getByLabelText('Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password.')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.queryByText('Invalid username or password.')).not.toBeInTheDocument()
    })
  })

  it('shows loading state while login is in progress', async () => {
    let resolve: () => void
    const deferred = new Promise<void>((res) => { resolve = res })
    mockLogin.mockReturnValue(deferred)

    renderLogin()
    await user.type(screen.getByLabelText('Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'TestPass1!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
    })

    resolve!()
  })
})
