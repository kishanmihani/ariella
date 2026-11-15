import type { Task, TaskForm } from '../types/task'

const API_URL = '/api/tasks'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  if (response.status === 204) return undefined as T

  const result = await response.json() as T | { error?: string }
  if (!response.ok) {
    const message = typeof result === 'object' && result !== null && 'error' in result
      ? result.error
      : undefined
    throw new Error(message || `Request failed with status ${response.status}.`)
  }
  return result as T
}

function jsonBody(body: object): RequestInit {
  return {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export function getTasks(): Promise<Task[]> {
  return request<Task[]>(API_URL)
}

export function createTask(task: TaskForm): Promise<Task> {
  return request<Task>(API_URL, { method: 'POST', ...jsonBody(task) })
}

export function updateTask(id: string, update: Partial<TaskForm> | Pick<Task, 'completed'>): Promise<Task> {
  return request<Task>(`${API_URL}/${id}`, { method: 'PATCH', ...jsonBody(update) })
}

export function deleteTask(id: string): Promise<void> {
  return request<void>(`${API_URL}/${id}`, { method: 'DELETE' })
}
