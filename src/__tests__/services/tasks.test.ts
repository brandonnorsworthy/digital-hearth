import { describe, it, expect, vi, afterEach } from 'vitest'
import { taskService } from '../../services/tasks'

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      status,
      ok: status >= 200 && status < 300,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve(body),
    }),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('taskService.list', () => {
  it('calls GET /households/:id/tasks', async () => {
    mockFetch(200, [])
    await taskService.list('1')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1/tasks'),
      expect.anything(),
    )
  })

  it('returns the parsed task array', async () => {
    const tasks = [{ id: '1', name: 'Vacuum', intervalDays: 3 }]
    mockFetch(200, tasks)
    const result = await taskService.list('1')
    expect(result).toEqual(tasks)
  })
})

describe('taskService.create', () => {
  it('calls POST /households/:id/tasks with the task data', async () => {
    mockFetch(201, { id: '5', name: 'New task' })
    await taskService.create('1', { name: 'New task', tier: 'short', intervalDays: 3 })
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/households/1/tasks'),
      expect.objectContaining({ method: 'POST' }),
    )
  })
})

describe('taskService.update', () => {
  it('calls PUT /tasks/:id with the updated data', async () => {
    mockFetch(200, { id: '3', name: 'Updated' })
    await taskService.update('3', { name: 'Updated' })
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/3'),
      expect.objectContaining({ method: 'PUT' }),
    )
  })
})

describe('taskService.delete', () => {
  it('calls DELETE /tasks/:id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ status: 204, ok: true, json: () => Promise.resolve(null) }),
    )
    await taskService.delete('7')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/7'),
      expect.objectContaining({ method: 'DELETE' }),
    )
  })
})

describe('taskService.complete', () => {
  it('calls POST /tasks/:id/complete', async () => {
    mockFetch(200, { id: '2', name: 'Vacuum' })
    await taskService.complete('2')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/2/complete'),
      expect.objectContaining({ method: 'POST' }),
    )
  })
})

describe('taskService.history', () => {
  it('calls GET /tasks/:id/history', async () => {
    mockFetch(200, [])
    await taskService.history('4')
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/4/history'),
      expect.anything(),
    )
  })
})
