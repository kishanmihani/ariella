export type Task = {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  completed: boolean
}

export type TaskForm = Omit<Task, 'id' | 'completed'>

export type Screen =
  | 'welcome'
  | 'home'
  | 'tasks'
  | 'create'
  | 'search'
  | 'detail'
  | 'edit'
  | 'notifications'
  | 'settings'

export function createEmptyTaskForm(): TaskForm {
  return {
    title: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    startTime: '09:00',
    endTime: '10:00',
  }
}
