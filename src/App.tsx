import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'
import { AppNavigation } from './components/AppNavigation'
import { Icon } from './components/Icon'
import { DashboardPage } from './pages/DashboardPage'
import { SearchPage, AllTasksPage, TaskDetailPage, TaskEditorPage } from './pages/TaskPages'
import { NotificationsPage, SettingsPage } from './pages/UtilityPages'
import { WelcomePage } from './pages/WelcomePage'
import { createTask, deleteTask, getTasks, updateTask } from './utils/taskApi'
import { createEmptyTaskForm, type Screen, type Task, type TaskForm } from './types/task'

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [form, setForm] = useState<TaskForm>(createEmptyTaskForm)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getTasks()
      .then((data) => {
        if (active) setTasks(data)
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : 'Could not connect to the task service.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [])

  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.length - completedCount
  const filteredTasks = useMemo(() => {
    const term = query.trim().toLowerCase()
    return tasks.filter((task) => !term || task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term))
  }, [query, tasks])

  function navigate(next: Screen) {
    setError('')
    setScreen(next)
  }

  function openCreate() {
    setForm(createEmptyTaskForm())
    navigate('create')
  }

  function openEdit(task: Task) {
    setSelectedTask(task)
    setForm({
      title: task.title,
      description: task.description,
      date: task.date,
      startTime: task.startTime,
      endTime: task.endTime,
    })
    navigate('edit')
  }

  async function saveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const taskToEdit = screen === 'edit' ? selectedTask : null
    try {
      const savedTask = taskToEdit
        ? await updateTask(taskToEdit.id, form)
        : await createTask(form)

      setTasks((current) => taskToEdit
        ? current.map((task) => task.id === savedTask.id ? savedTask : task)
        : [savedTask, ...current])
      setSelectedTask(savedTask)
      setScreen('detail')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save task.')
    }
  }

  async function toggleTask(task: Task) {
    setError('')
    try {
      const updatedTask = await updateTask(task.id, { completed: !task.completed })
      setTasks((current) => current.map((item) => item.id === task.id ? updatedTask : item))
      if (selectedTask?.id === task.id) setSelectedTask(updatedTask)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to update task.')
    }
  }

  async function removeTask(task: Task) {
    setError('')
    try {
      await deleteTask(task.id)
      setTasks((current) => current.filter((item) => item.id !== task.id))
      setSelectedTask(null)
      setScreen('tasks')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to delete task.')
    }
  }

  const taskActions = {
    onToggle: toggleTask,
    onSelect: (task: Task) => {
      setSelectedTask(task)
      navigate('detail')
    },
    onEdit: openEdit,
    onDelete: removeTask,
    onCreate: openCreate,
  }

  let page: ReactNode
  switch (screen) {
    case 'welcome':
      page = <WelcomePage onStart={() => navigate('home')} />
      break
    case 'home':
      page = (
        <DashboardPage
          tasks={tasks}
          completedCount={completedCount}
          pendingCount={pendingCount}
          loading={loading}
          query={query}
          onSearch={() => navigate('search')}
          onViewAll={() => navigate('tasks')}
          onSettings={() => navigate('settings')}
          {...taskActions}
        />
      )
      break
    case 'tasks':
      page = (
        <AllTasksPage
          tasks={filteredTasks}
          completedCount={completedCount}
          loading={loading}
          query={query}
          onSearch={() => navigate('search')}
          {...taskActions}
        />
      )
      break
    case 'create':
    case 'edit':
      page = (
        <TaskEditorPage
          value={form}
          editing={screen === 'edit'}
          onChange={setForm}
          onSubmit={(event) => void saveTask(event)}
          onBack={() => navigate(screen === 'edit' ? 'detail' : 'home')}
        />
      )
      break
    case 'search':
      page = (
        <SearchPage
          tasks={filteredTasks}
          loading={loading}
          query={query}
          onQueryChange={setQuery}
          onBack={() => navigate('home')}
          {...taskActions}
        />
      )
      break
    case 'detail':
      page = (
        <TaskDetailPage
          task={selectedTask}
          onBack={() => navigate('tasks')}
          onToggle={toggleTask}
          onEdit={openEdit}
        />
      )
      break
    case 'notifications':
      page = <NotificationsPage onHome={() => navigate('home')} onWelcome={() => navigate('welcome')} />
      break
    case 'settings':
      page = <SettingsPage onHome={() => navigate('home')} onWelcome={() => navigate('welcome')} />
      break
  }

  return (
    <div className={`app-shell ${screen === 'welcome' ? 'welcome-shell' : ''}`}>
      {screen !== 'welcome' && (
        <AppNavigation screen={screen} pendingCount={pendingCount} onNavigate={navigate} onCreate={openCreate} />
      )}
      <div className="main-column">
        {error && (
          <div role="alert" className="error-banner">
            <span>{error}</span>
            <button aria-label="Dismiss error" onClick={() => setError('')}><Icon name="close" size={18} /></button>
          </div>
        )}
        {page}
      </div>
    </div>
  )
}

export default App
