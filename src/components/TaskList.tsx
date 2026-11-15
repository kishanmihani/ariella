import type { Task } from '../types/task'
import { formatTaskDate, getTodayIsoDate } from '../utils/taskDate'
import { Icon } from './Icon'

type TaskListProps = {
  tasks: Task[]
  onToggle: (task: Task) => void
  onSelect: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onCreate: () => void
}

export function TaskList({ tasks, onToggle, onSelect, onEdit, onDelete, onCreate }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon"><Icon name="check" size={24} /></span>
        <strong>Nothing on your list</strong>
        <span>Add a task and make today count.</span>
        <button className="text-button" onClick={onCreate}>Create a task</button>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className={`task-row ${task.completed ? 'is-complete' : ''}`} key={task.id}>
          <button
            className="checkbox"
            aria-label={task.completed ? `Mark ${task.title} incomplete` : `Complete ${task.title}`}
            onClick={() => onToggle(task)}
          >
            {task.completed && <Icon name="check" size={15} />}
          </button>
          <button className="task-title" onClick={() => onSelect(task)}>
            {task.title}
            <span>{task.date === getTodayIsoDate() ? 'Today' : formatTaskDate(task.date, { weekday: 'short', month: 'short', day: 'numeric' })} · {task.startTime}</span>
          </button>
          <div className="row-actions">
            <button className="icon-button" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
              <Icon name="edit" />
            </button>
            <button className="icon-button delete-button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}>
              <Icon name="trash" />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
