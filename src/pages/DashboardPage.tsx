import type { Task } from '../types/task'
import { getTodayIsoDate, getWeekDates } from '../utils/taskDate'
import { Icon } from '../components/Icon'
import { TaskList } from '../components/TaskList'

type TaskActions = {
  onToggle: (task: Task) => void
  onSelect: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onCreate: () => void
}

type DashboardPageProps = TaskActions & {
  tasks: Task[]
  completedCount: number
  pendingCount: number
  loading: boolean
  query: string
  onSearch: () => void
  onViewAll: () => void
  onSettings: () => void
}

export function DashboardPage({
  tasks,
  completedCount,
  pendingCount,
  loading,
  query,
  onToggle,
  onSelect,
  onEdit,
  onDelete,
  onCreate,
  onSearch,
  onViewAll,
  onSettings,
}: DashboardPageProps) {
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  return (
    <main className="page-content">
      <div className="home-topline">
        <div>
          <p className="eyebrow">{new Date().toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</p>
          <h1>Good morning<span className="wave"> ✨</span></h1>
          <p className="page-subtitle">Let’s make today a good one.</p>
        </div>
        <button className="avatar" aria-label="Open settings" onClick={onSettings}>A</button>
      </div>
      <div className="search-control" onClick={onSearch}>
        <Icon name="search" size={21} />
        <input aria-label="Search tasks" placeholder="Search for a task" value={query} readOnly />
        <button aria-label="Open search" onClick={onSearch}><Icon name="search" size={21} /></button>
      </div>
      <div className="date-strip" aria-label="This week">
        <div className="date-strip-head">
          <strong>This week</strong>
          <button className="text-button" onClick={onViewAll}>View calendar</button>
        </div>
        <div className="date-strip-days">
          {getWeekDates().map((date) => {
            const active = date.toISOString().slice(0, 10) === getTodayIsoDate()
            return (
              <button className={`date-chip ${active ? 'active' : ''}`} key={date.toISOString()} onClick={onViewAll}>
                <span>{date.toLocaleDateString('en', { weekday: 'short' })}</span>
                <strong>{String(date.getDate()).padStart(2, '0')}</strong>
                {active && <i />}
              </button>
            )
          })}
        </div>
      </div>
      <section className="stats-grid" aria-label="Weekly task summary">
        <div className="stat-card completed-stat">
          <span className="stat-icon"><Icon name="check" size={19} /></span>
          <div><span className="stat-label">Task complete</span><strong>{String(completedCount).padStart(2, '0')}</strong><span className="stat-caption">This week</span></div>
        </div>
        <div className="stat-card pending-stat">
          <span className="stat-icon"><Icon name="close" size={19} /></span>
          <div><span className="stat-label">Task pending</span><strong>{String(pendingCount).padStart(2, '0')}</strong><span className="stat-caption">This week</span></div>
        </div>
      </section>
      <section className="progress-section">
        <div className="section-title"><h2>Weekly progress</h2><span>{progress}%</span></div>
        <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
      </section>
      <section className="today-section">
        <div className="section-title"><h2>Tasks today</h2><button className="text-button" onClick={onViewAll}>View all <span>→</span></button></div>
        {loading
          ? <p className="loading-note">Loading your tasks…</p>
          : <TaskList tasks={tasks.slice(0, 4)} onToggle={onToggle} onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} />}
      </section>
      <button className="floating-add" aria-label="Create a task" onClick={onCreate}><Icon name="plus" size={28} /></button>
    </main>
  )
}
