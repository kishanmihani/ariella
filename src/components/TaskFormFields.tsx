import type { FormEvent } from 'react'
import type { TaskForm } from '../types/task'
import { Icon } from './Icon'

type TaskFormFieldsProps = {
  value: TaskForm
  editing: boolean
  onChange: (value: TaskForm) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function TaskFormFields({ value, editing, onChange, onSubmit }: TaskFormFieldsProps) {
  function update<K extends keyof TaskForm>(key: K, fieldValue: TaskForm[K]) {
    onChange({ ...value, [key]: fieldValue })
  }

  return (
    <form className="task-form" onSubmit={onSubmit}>
      <label className="field-label">
        Task title
        <input
          autoFocus
          required
          maxLength={100}
          placeholder="What needs to get done?"
          value={value.title}
          onChange={(event) => update('title', event.target.value)}
        />
      </label>
      <div className="field-grid">
        <label className="field-label">
          Starts at
          <span className="field-with-icon"><Icon name="clock" size={18} /><input type="time" required value={value.startTime} onChange={(event) => update('startTime', event.target.value)} /></span>
        </label>
        <label className="field-label">
          Ends at
          <span className="field-with-icon"><Icon name="clock" size={18} /><input type="time" required value={value.endTime} onChange={(event) => update('endTime', event.target.value)} /></span>
        </label>
      </div>
      <label className="field-label">
        Date
        <span className="field-with-icon"><Icon name="calendar" size={18} /><input type="date" required value={value.date} onChange={(event) => update('date', event.target.value)} /></span>
      </label>
      <label className="field-label">
        Description <span className="optional-label">OPTIONAL</span>
        <textarea
          rows={4}
          maxLength={500}
          placeholder="Add a few details to help you get started…"
          value={value.description}
          onChange={(event) => update('description', event.target.value)}
        />
      </label>
      <button className="primary-button submit-button" type="submit">{editing ? 'Save changes' : 'Create task'}</button>
    </form>
  )
}
