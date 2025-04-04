/* eslint-disable no-underscore-dangle */
import { Db } from 'mongodb'

export default async function memoDb(
	connection: () => Promise<{
		db: Db
	}>
) {
	if (!global._mongoDb) {
		global._mongoDb = (await connection()).db
		console.log('Connected ot data base.')
	}

	return { db: global._mongoDb }
}
