import { MongoClient } from 'mongodb'
import { seedTasks, setTaskCollection } from '../models/taskModel.js'

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
const dbName = process.env.MONGO_DB || 'daybook'
const client = new MongoClient(uri)

export async function connectDatabase() {
  await client.connect()
  const collection = client.db(dbName).collection('tasks')
  setTaskCollection(collection)

  if (await collection.countDocuments() === 0) {
    await collection.insertMany(seedTasks.map((task) => ({ ...task, createdAt: new Date() })))
  }

  return collection
}

export async function closeDatabase() {
  await client.close()
}

export function getDatabaseName() {
  return dbName
}
