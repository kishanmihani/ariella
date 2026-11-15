import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import { getDatabaseName } from './config/database.js'

const app = express()

app.use(express.json({ limit: '16kb' }))
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: getDatabaseName() })
})
app.use('/api/tasks', taskRoutes)
app.use((_request, _response, next) => {
  const error = new Error('Route not found.')
  error.status = 404
  next(error)
})
app.use((error, _request, response, _next) => {
  console.error('Task API request failed:', error)
  if (response.headersSent) return

  const status = error.status || 500
  response.status(status).json({
    error: status >= 500 ? 'Internal server error.' : error.message,
  })
})

export default app
