import { IProduct } from '../interfaces'
import ProductStructure from './ProductStructure'

class HendlerError {
	private static baseError(message: string, error?: unknown) {
		if (process.env.NODE_ENV === 'development') {
			if (error) console.error(error)
			throw new Error(message)
		} else {
			console.error(message)
			if (error) console.error(error)
		}
	}

	static addAction(message: string, error?: unknown) {
		HendlerError.baseError(message, error)
	}

	static productType(products: IProduct[] | readonly IProduct[]) {
		const isInstance = products.every((el) => el instanceof ProductStructure)

		if (!isInstance) HendlerError.baseError(`Expected instanceof ProductStructure but got ${JSON.stringify(products)}.`)
	}
}

export default HendlerError
