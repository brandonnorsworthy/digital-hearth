import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Layout from '../../components/Layout'

function renderLayout(path = '/', props: Parameters<typeof Layout>[0] = { children: <div>content</div> }) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Layout {...props} />
    </MemoryRouter>,
  )
}

describe('Layout', () => {
  it('renders the bottom nav by default', () => {
    renderLayout()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('hides the bottom nav in focusMode', () => {
    renderLayout('/', { children: <div />, focusMode: true })
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('marks the Home nav item as active when on /', () => {
    renderLayout('/')
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink.className).toContain('bg-primary-container')
  })

  it('does not mark Home as active when on /tasks', () => {
    renderLayout('/tasks')
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink.className).not.toContain('bg-primary-container')
  })

  it('marks the Tasks nav item as active when on /tasks', () => {
    renderLayout('/tasks')
    const tasksLink = screen.getByRole('link', { name: /tasks/i })
    expect(tasksLink.className).toContain('bg-primary-container')
  })

  it('renders the page title', () => {
    renderLayout('/', { children: <div />, title: 'My Page' })
    expect(screen.getByText('My Page')).toBeInTheDocument()
  })
})
