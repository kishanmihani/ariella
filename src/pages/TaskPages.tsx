import type { FormEvent } from 'react'
import type { Task, TaskForm } from '../types/task'
import { formatTaskDate } from '../utils/taskDate'
import { Icon } from '../components/Icon'
import { PageHeader } from '../components/PageHeader'
import { TaskFormFields } from '../components/TaskFormFields'
import { TaskList } from '../components/TaskList'

type TaskActions = {
  onToggle: (task: Task) => void
  onSelect: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onCreate: () => void
}

type TaskCollectionProps = TaskActions & {
  tasks: Task[]
  completedCount: number
  loading: boolean
  query: string
  onSearch: () => void
}

export function AllTasksPage({ tasks, completedCount, loading, query, onSearch, onToggle, onSelect, onEdit, onDelete, onCreate }: TaskCollectionProps) {
  return (
    <main className="page-content subpage">
      <PageHeader title="All tasks" subtitle="A little progress adds up." />
      <div className="task-page-toolbar">
        <div className="search-control compact" onClick={onSearch}>
          <Icon name="search" size={19} />
          <input aria-label="Filter tasks" placeholder="Search your tasks" value={query} readOnly />
        </div>
        <button className="primary-button toolbar-add" onClick={onCreate}><Icon name="plus" size={18} /> New task</button>
      </div>
      <div className="list-summary"><span>{tasks.length} tasks</span><span>{completedCount} completed</span></div>
      {loading
        ? <p className="loading-note">Loading your tasks…</p>
        : <TaskList tasks={tasks} onToggle={onToggle} onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />}
    </main>
  )
}

type SearchPageProps = TaskActions & {
  tasks: Task[]
  loading: boolean
  query: string
  onQueryChange: (value: string) => void
  onBack: () => void
}

export function SearchPage({ tasks, loading, query, onQueryChange, onBack, onToggle, onSelect, onEdit, onDelete, onCreate }: SearchPageProps) {
  return (
    <main className="page-content subpage search-page">
      <button className="back-button" onClick={onBack}><Icon name="arrow" size={20} /> Back</button>
      <div className="search-screen-input">
        <input autoFocus aria-label="Search tasks" placeholder="Search tasks" value={query} onChange={(event) => onQueryChange(event.target.value)} />
        <Icon name="search" size={22} />
      </div>
      <div className="section-title search-results-heading"><h2>{query ? 'Search results' : 'Recent tasks'}</h2><span>{tasks.length} found</span></div>
      {loading
        ? <p className="loading-note">Loading your tasks…</p>
        : <TaskList tasks={tasks} onToggle={onToggle} onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />}
    </main>
  )
}

type TaskEditorPageProps = {
  value: TaskForm
  editing: boolean
  onChange: (value: TaskForm) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onBack: () => void
}

export function TaskEditorPage({ value, editing, onChange, onSubmit, onBack }: TaskEditorPageProps) {
  return (
    <main className="page-content subpage form-page">
      <button className="back-button" onClick={onBack}><Icon name="arrow" size={20} /> Back</button>
      <PageHeader
        title={editing ? 'Edit task' : 'New task'}
        subtitle={editing ? 'Make a change to your plan.' : 'Good plans start with one small step.'}
      />
      <section className="form-card">
        <TaskFormFields value={value} editing={editing} onChange={onChange} onSubmit={onSubmit} />
      </section>
    </main>
  )
}

type TaskDetailPageProps = {
  task: Task | null
  onBack: () => void
  onToggle: (task: Task) => void
  onEdit: (task: Task) => void
}

export function TaskDetailPage({ task, onBack, onToggle, onEdit }: TaskDetailPageProps) {
  return (
    <main className="page-content subpage detail-page">
      <button className="back-button" onClick={onBack}><Icon name="arrow" size={20} /> All tasks</button>
      {task
        ? <section className="detail-card">
            <div className={`detail-status ${task.completed ? 'done' : ''}`}>
              <Icon name={task.completed ? 'check' : 'clock'} size={18} />{task.completed ? 'Completed' : 'Up next'}
            </div>
            <h1>{task.title}</h1>
            <p className="detail-description">{task.description || 'No description added yet.'}</p>
            <div className="detail-meta">
              <span><Icon name="calendar" size={18} />{formatTaskDate(task.date, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              <span><Icon name="clock" size={18} />{task.startTime} – {task.endTime}</span>
            </div>
            <div className="detail-actions">
              <button className="primary-button" onClick={() => onToggle(task)}>{task.completed ? 'Mark as not done' : 'Mark as complete'}</button>
              <button className="secondary-button" onClick={() => onEdit(task)}><Icon name="edit" size={18} /> Edit task</button>
            </div>
          </section>
        : <div className="empty-state"><strong>Task not found</strong><button className="text-button" onClick={onBack}>Back to tasks</button></div>}
    </main>
  )
}
