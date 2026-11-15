import 'dotenv/config'
import app from './app.js'
import { closeDatabase, connectDatabase } from './config/database.js'

const port = Number(process.env.API_PORT || 3001)

async function startServer() {
  await connectDatabase()
  const server = app.listen(port, '127.0.0.1', () => {
    console.log(`Task API listening at http://127.0.0.1:${port}`)
  })

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
      server.close(async () => {
        await closeDatabase()
        process.exit(0)
      })
    })
  }
}

startServer().catch(async (error) => {
  console.error('Could not start the task API:', error)
  await closeDatabase()
  process.exitCode = 1
})
