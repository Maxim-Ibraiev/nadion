// Пример с MongoDB и mongoose

import { HandlerError } from '@/helpers'
import mongoose from 'mongoose'

declare global {
	// eslint-disable-next-line vars-on-top, no-var, no-unused-vars, no-shadow
	var mongoose: {
		connection: mongoose.Mongoose | null
		promise: Promise<mongoose.Mongoose> | null
	}
}

const URL_DB = process.env.URL_DB || ''
let cached = global.mongoose

if (!URL_DB && window) HandlerError.addAction('URL_DB not available.')
if (!cached) cached = global.mongoose = { connection: null, promise: null }

async function connectToDatabase() {
	if (cached.connection) return cached.connection
	if (!cached.promise) cached.promise = mongoose.connect(URL_DB)

	try {
		cached.connection = await cached.promise
		console.log('Database connection successful')
	} catch (error) {
		console.log(`Server not running. Error message ${error}`)
	}

	return cached.connection
}

export default connectToDatabase

mongoose.connection.on('error', (err: Error) => {
	console.log(`Mongoose error: ${err.message}`)
})
