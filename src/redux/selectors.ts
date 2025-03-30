import memoize from 'lodash.memoize'

import { ProductStructure } from '../helpers'
import { IError, IProduct, IProductObject, IState } from '../interfaces'

export const getProductsForRedux = (state: IState): IProductObject[] => state.main.products
export const getSelectedProductsForRedux = (state: IState): IProductObject[] => state.selectedProducts
export const getError = (state: IState): IError => state.main.error

export const getProducts = (state: IState): IProduct[] => getProductStructure(getProductsForRedux(state))
export const getSelectedProducts = (state: IState): IProduct[] => getProductStructure(getSelectedProductsForRedux(state))

export const getProductStructure = memoize((products: IProductObject[]): IProduct[] => {
	try {
		return products.map((product) => new ProductStructure(product))
	} catch (error) {
		if (Array.isArray(products)) console.warn(`Pleaes check incoming products. products: ${products}`)
		else console.warn(`Incoming products is not aray.  products: ${products}`)

		return []
	}
})
