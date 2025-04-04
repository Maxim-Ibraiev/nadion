import memoDb from '@/api/src/serverHelpers/memoDb'
import { MongoClient } from 'mongodb'

const urlDb = process.env.URL_DB

async function connection() {
	if (!urlDb) throw new Error(`No access to url. url : ${urlDb}`)

	const client = new MongoClient(urlDb)
	let mongoClient: MongoClient | null = null

	try {
		if (!mongoClient) {
			mongoClient = await client.connect()
			console.log('Connected successful')
		}
	} catch {
		throw new Error('Connected unsuccess')
	}

	const db = mongoClient.db('db-bf')

	return { db }
}

const connectToDatabase = async () => memoDb(connection)

export default connectToDatabase
