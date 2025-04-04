/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import { IProductObject } from '@/interfaces'
import getCollection from '@api/db/getCollection'

interface IResponse extends IProductObject {
	_id: unknown
	__v: unknown
	createdAt: unknown
	updatedAt: unknown
	images: (IProductObject['images'][0] & { _id: unknown })[]
}

export const listProducts = async (): Promise<IProductObject[]> => {
	const collection = await getCollection<IResponse>('products')
	const response = await collection.find().toArray()

	const products: IProductObject[] = response.map((el) => {
		el.id = String(el._id)

		delete el._id
		delete el.__v
		delete el.createdAt
		delete el.updatedAt

		el.images.map((img) => {
			delete img._id
			return img
		})

		return el
	})

	return products
}

export default { listProducts }
