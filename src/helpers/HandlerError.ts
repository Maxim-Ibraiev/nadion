import { IProduct } from '../interfaces'
import ProductStructure from './ProductStructure'

class HendlerError {
	private static baseError(message: string) {
		if (process.env.NODE_ENV === 'development') throw new Error(message)
		console.error(message)
	}

	static addAction(message: string) {
		HendlerError.baseError(message)
	}

	static productType(products: IProduct[] | readonly IProduct[]) {
		const isInstance = products.every((el) => el instanceof ProductStructure)

		if (!isInstance) HendlerError.baseError(`Expected instanceof ProductStructure but got ${JSON.stringify(products)}.`)
	}

	static placeHolder(error: unknown) {
		console.error(error)

		HendlerError.baseError(`getPlaceholder error.`)
	}
}

export default HendlerError
