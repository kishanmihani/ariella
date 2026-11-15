import { ObjectId } from 'mongodb'

let tasks

export const seedTasks = [
  { title: 'Finishing Wireframe', description: 'Polish the last screens for the product flow.', date: new Date().toISOString().slice(0, 10), startTime: '09:00', endTime: '10:00', completed: false },
  { title: 'Meeting with team', description: 'Weekly product check-in and planning.', date: new Date().toISOString().slice(0, 10), startTime: '11:00', endTime: '11:30', completed: false },
  { title: 'Buy a cat food', description: '', date: new Date().toISOString().slice(0, 10), startTime: '13:00', endTime: '13:30', completed: true },
  { title: 'Finishing daily commission', description: '', date: new Date().toISOString().slice(0, 10), startTime: '15:00', endTime: '16:00', completed: true },
]

export function setTaskCollection(collection) {
  tasks = collection
}

function collection() {
  if (!tasks) throw new Error('Task collection is not connected.')
  return tasks
}

function toTask(document) {
  if (!document) return null
  const { _id, ...task } = document
  return { id: _id.toHexString(), ...task }
}

function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function isValidTime(value) {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

export function validateTask(body, partial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'Expected a task object.'

  const allowedFields = ['title', 'description', 'date', 'startTime', 'endTime', 'completed']
  if (Object.keys(body).some((key) => !allowedFields.includes(key))) return 'Task contains unsupported fields.'

  if ((!partial || 'title' in body) && (typeof body.title !== 'string' || !body.title.trim() || body.title.length > 100)) {
    return 'Title is required and must be 100 characters or fewer.'
  }
  if ((!partial || 'description' in body) && (typeof body.description !== 'string' || body.description.length > 500)) {
    return 'Description must be 500 characters or fewer.'
  }
  if ((!partial || 'date' in body) && !isValidDate(body.date)) return 'Date must be a valid YYYY-MM-DD date.'
  if ((!partial || 'startTime' in body) && !isValidTime(body.startTime)) return 'Start time must use HH:MM format.'
  if ((!partial || 'endTime' in body) && !isValidTime(body.endTime)) return 'End time must use HH:MM format.'
  if ('completed' in body && typeof body.completed !== 'boolean') return 'Completed must be a boolean.'
  if (Object.keys(body).length === 0) return 'Provide at least one field to update.'

  return null
}

export async function findAllTasks() {
  const documents = await collection().find().sort({ createdAt: -1 }).toArray()
  return documents.map(toTask)
}

export async function createTask(data) {
  const document = { ...data, title: data.title.trim(), createdAt: new Date() }
  const result = await collection().insertOne(document)
  return toTask({ ...document, _id: result.insertedId })
}

export async function updateTask(id, changes) {
  if (!ObjectId.isValid(id)) return null
  const update = { ...changes }
  if (typeof update.title === 'string') update.title = update.title.trim()

  const document = await collection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
    { returnDocument: 'after' },
  )
  return toTask(document)
}

export async function removeTask(id) {
  if (!ObjectId.isValid(id)) return false
  const result = await collection().deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount > 0
}
