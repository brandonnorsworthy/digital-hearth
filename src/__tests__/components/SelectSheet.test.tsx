import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectSheet from '../../components/SelectSheet'

const defaultProps = {
  title: 'Pick an option',
  options: ['Apple', 'Banana', 'Cherry'],
  value: 'Banana',
  onSelect: vi.fn(),
  onClose: vi.fn(),
}

function renderSheet(overrides = {}) {
  return render(<SelectSheet {...defaultProps} {...overrides} />)
}

describe('SelectSheet', () => {
  it('renders the title', () => {
    renderSheet()
    expect(screen.getByRole('heading', { name: 'Pick an option' })).toBeInTheDocument()
  })

  it('renders all options as buttons', () => {
    renderSheet()
    expect(screen.getByRole('button', { name: /apple/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /banana/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cherry/i })).toBeInTheDocument()
  })

  it('shows a checkmark for the selected option', () => {
    renderSheet()
    // The selected option button (Banana) contains a check icon
    const bananaBtn = screen.getByRole('button', { name: /banana/i })
    expect(bananaBtn.querySelector('.material-symbols-outlined')).toHaveTextContent('check')
  })

  it('does not show a checkmark for unselected options', () => {
    renderSheet()
    const appleBtn = screen.getByRole('button', { name: /apple/i })
    expect(appleBtn.querySelector('.material-symbols-outlined')).toBeNull()
  })

  it('calls onSelect and onClose when an option is clicked', async () => {
    const onSelect = vi.fn()
    const onClose = vi.fn()
    renderSheet({ onSelect, onClose })
    await userEvent.click(screen.getByRole('button', { name: /apple/i }))
    expect(onSelect).toHaveBeenCalledWith('Apple')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the close button in the header is clicked', async () => {
    const onClose = vi.fn()
    renderSheet({ onClose })
    // The header close button contains a "close" material icon
    const allButtons = screen.getAllByRole('button')
    const headerCloseBtn = allButtons.find(btn =>
      btn.querySelector('.material-symbols-outlined')?.textContent === 'close',
    )!
    await userEvent.click(headerCloseBtn)
    expect(onClose).toHaveBeenCalled()
  })
})
