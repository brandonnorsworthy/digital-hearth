import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DueBadge from '../../components/DueBadge'

describe('DueBadge', () => {
  it('renders the label text', () => {
    render(<DueBadge variant="ok" label="10d Left" />)
    expect(screen.getByText('10d Left')).toBeInTheDocument()
  })

  it('applies urgent classes for urgent variant', () => {
    render(<DueBadge variant="urgent" label="Due Today" />)
    const badge = screen.getByText('Due Today')
    expect(badge.className).toContain('text-primary')
    expect(badge.className).toContain('bg-primary-container')
  })

  it('applies soon classes for soon variant', () => {
    render(<DueBadge variant="soon" label="Due in 2d" />)
    const badge = screen.getByText('Due in 2d')
    expect(badge.className).toContain('text-tertiary')
    expect(badge.className).toContain('bg-tertiary-container/20')
  })

  it('applies ok classes for ok variant', () => {
    render(<DueBadge variant="ok" label="5d Left" />)
    const badge = screen.getByText('5d Left')
    expect(badge.className).toContain('text-on-surface-variant')
    expect(badge.className).toContain('bg-surface-variant')
  })
})
