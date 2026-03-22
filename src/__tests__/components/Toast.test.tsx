import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast } from '../../components/Toast'

vi.mock('../../contexts/ToastContext', () => ({
  useToast: vi.fn(),
}))

import { useToast } from '../../contexts/ToastContext'

describe('Toast', () => {
  it('renders nothing when toasts array is empty', () => {
    vi.mocked(useToast).mockReturnValue({
      toasts: [],
      dismiss: vi.fn(),
      showToast: vi.fn(),
      error: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
    })
    const { container } = render(<Toast />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a toast message', () => {
    vi.mocked(useToast).mockReturnValue({
      toasts: [{ id: 1, message: 'Task completed!', variant: 'success' }],
      dismiss: vi.fn(),
      showToast: vi.fn(),
      error: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
    })
    render(<Toast />)
    expect(screen.getByText('Task completed!')).toBeInTheDocument()
  })

  it('renders multiple toasts', () => {
    vi.mocked(useToast).mockReturnValue({
      toasts: [
        { id: 1, message: 'First toast', variant: 'success' },
        { id: 2, message: 'Second toast', variant: 'error' },
      ],
      dismiss: vi.fn(),
      showToast: vi.fn(),
      error: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
    })
    render(<Toast />)
    expect(screen.getByText('First toast')).toBeInTheDocument()
    expect(screen.getByText('Second toast')).toBeInTheDocument()
  })

  it('renders a dismiss button with aria-label="Dismiss"', () => {
    vi.mocked(useToast).mockReturnValue({
      toasts: [{ id: 1, message: 'Hello', variant: 'info' }],
      dismiss: vi.fn(),
      showToast: vi.fn(),
      error: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
    })
    render(<Toast />)
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })

  it('calls dismiss with the toast id when dismiss button is clicked', async () => {
    const dismiss = vi.fn()
    vi.mocked(useToast).mockReturnValue({
      toasts: [{ id: 42, message: 'Hello', variant: 'info' }],
      dismiss,
      showToast: vi.fn(),
      error: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
    })
    render(<Toast />)
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(dismiss).toHaveBeenCalledWith(42)
  })
})
