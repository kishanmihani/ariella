import {
  createTask,
  findAllTasks,
  removeTask,
  updateTask,
  validateTask,
} from '../models/taskModel.js'

function asyncHandler(handler) {
  return (request, response, next) => {
    Promise.resolve(handler(request, response, next)).catch(next)
  }
}

export const listTasks = asyncHandler(async (_request, response) => {
  response.json(await findAllTasks())
})

export const addTask = asyncHandler(async (request, response) => {
  const validationError = validateTask(request.body)
  if (validationError) {
    response.status(400).json({ error: validationError })
    return
  }
  response.status(201).json(await createTask(request.body))
})

export const editTask = asyncHandler(async (request, response) => {
  const validationError = validateTask(request.body, true)
  if (validationError) {
    response.status(400).json({ error: validationError })
    return
  }

  const task = await updateTask(request.params.id, request.body)
  if (!task) {
    response.status(404).json({ error: 'Task not found.' })
    return
  }
  response.json(task)
})

export const deleteTask = asyncHandler(async (request, response) => {
  const deleted = await removeTask(request.params.id)
  if (!deleted) {
    response.status(404).json({ error: 'Task not found.' })
    return
  }
  response.status(204).end()
})
