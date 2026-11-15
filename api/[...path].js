import app from '../server/app.js'
import { connectDatabase } from '../server/config/database.js'

let databaseReady

export default async function apiHandler(request, response) {
  try {
    if (!databaseReady) {
      databaseReady = connectDatabase().catch((error) => {
        databaseReady = undefined
        throw error
      })
    }
    await databaseReady
    app(request, response)
  } catch (error) {
    console.error('Could not connect to MongoDB:', error)
    if (!response.headersSent) response.status(503).json({ error: 'Task database is unavailable.' })
  }
}
