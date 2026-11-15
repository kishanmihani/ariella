import { Router } from 'express'
import { addTask, deleteTask, editTask, listTasks } from '../controllers/taskController.js'

const taskRoutes = Router()

taskRoutes.get('/', listTasks)
taskRoutes.post('/', addTask)
taskRoutes.patch('/:id', editTask)
taskRoutes.delete('/:id', deleteTask)

export default taskRoutes
