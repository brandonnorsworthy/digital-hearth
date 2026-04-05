import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import JoinHousehold from '../../pages/JoinHousehold'

const user = userEvent.setup({ delay: null })

const mockJoinHousehold = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ joinHousehold: mockJoinHousehold }),
}))

beforeEach(() => {
  mockJoinHousehold.mockReset()
  mockNavigate.mockReset()
})

function renderPage() {
  return render(
    <MemoryRouter>
      <JoinHousehold />
    </MemoryRouter>,
  )
}

describe('JoinHousehold', () => {
  it('renders invite code, username, password, confirm password inputs and submit button', () => {
    renderPage()
    expect(screen.getByLabelText('Invite Code')).toBeInTheDocument()
    expect(screen.getByLabelText('Your Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /join household/i })).toBeInTheDocument()
  })

  it('calls joinHousehold with uppercased code, username, and password on submit', async () => {
    mockJoinHousehold.mockResolvedValue(undefined)
    renderPage()

    await user.type(screen.getByLabelText('Invite Code'), 'ab12cd34')
    await user.type(screen.getByLabelText('Your Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'TestPass1!ab')
    await user.type(screen.getByLabelText('Confirm Password'), 'TestPass1!ab')
    await user.click(screen.getByRole('button', { name: /join household/i }))

    await waitFor(() =>
      expect(mockJoinHousehold).toHaveBeenCalledWith('AB12CD34', 'Sarah', 'TestPass1!ab')
    )
  })

  it('shows a validation error when passwords do not match', async () => {
    renderPage()

    await user.type(screen.getByLabelText('Invite Code'), 'AB12CD34')
    await user.type(screen.getByLabelText('Your Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'TestPass1!ab')
    await user.type(screen.getByLabelText('Confirm Password'), 'DiffPass1!ab')
    await user.click(screen.getByRole('button', { name: /join household/i }))

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument()
    expect(mockJoinHousehold).not.toHaveBeenCalled()
  })

  it('shows a validation error when password is too weak', async () => {
    renderPage()

    await user.type(screen.getByLabelText('Invite Code'), 'AB12CD34')
    await user.type(screen.getByLabelText('Your Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'weak')
    await user.type(screen.getByLabelText('Confirm Password'), 'weak')
    await user.click(screen.getByRole('button', { name: /join household/i }))

    expect(screen.getByText(/password must/i)).toBeInTheDocument()
    expect(mockJoinHousehold).not.toHaveBeenCalled()
  })

  it('shows an expired code error when joinHousehold throws an expired message', async () => {
    mockJoinHousehold.mockRejectedValue(new Error('expired'))
    renderPage()

    await user.type(screen.getByLabelText('Invite Code'), 'AB12CD34')
    await user.type(screen.getByLabelText('Your Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'TestPass1!ab')
    await user.type(screen.getByLabelText('Confirm Password'), 'TestPass1!ab')
    await user.click(screen.getByRole('button', { name: /join household/i }))

    await waitFor(() =>
      expect(screen.getByText(/invite code has expired/i)).toBeInTheDocument()
    )
  })

  it('navigates to / on successful join', async () => {
    mockJoinHousehold.mockResolvedValue(undefined)
    renderPage()

    await user.type(screen.getByLabelText('Invite Code'), 'AB12CD34')
    await user.type(screen.getByLabelText('Your Username'), 'Sarah')
    await user.type(screen.getByLabelText('Password'), 'TestPass1!ab')
    await user.type(screen.getByLabelText('Confirm Password'), 'TestPass1!ab')
    await user.click(screen.getByRole('button', { name: /join household/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true }))
  })
})
