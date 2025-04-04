/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import { Db } from 'mongodb'
import { Entries } from 'type-fest'

declare global {
	var _mongoDb: Db | undefined
}
