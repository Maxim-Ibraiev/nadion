import { getError, getProductsForRedux } from '@/redux/selectors'
import { combineReducers, createAction, createReducer } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { ProductStructure } from '../../helpers'
import { IError, IProductObject, IShotSelectedProducts, IState } from '../../interfaces'
import { productsError, productsSuccess, selectedProductsSuccess, setSelectedProducts, setSelectedSizeOfProduct } from './mainActions'

interface IPayload<T> {
	payload: T
}

export const hydrate = createAction<IState>(HYDRATE)

const products = createReducer<IProductObject[]>([], (builder) => {
	builder
		.addCase(hydrate, (_, { payload }) => getProductsForRedux(payload))
		.addCase(productsSuccess, (_, action) => action.payload)
		.addCase(setSelectedSizeOfProduct, handleSelectedSizeOfProduct)
})

const error = createReducer<IError>(null, (builder) => {
	builder
		.addCase(hydrate, (_, { payload }) => getError(payload))
		.addCase(productsSuccess, () => null)
		.addCase(productsError, (_, { payload }) => payload)
})

export const selectedProducts = createReducer<IProductObject[]>([], (builder) => {
	builder
		.addCase(hydrate, (draft, { payload }) => {
			// TODO: validation for product from local storage
			if (draft) {
				draft.concat(getProductsForRedux(payload))
			}
		})
		.addCase(selectedProductsSuccess, (_, { payload }) => payload.map((el) => el.toObject()))
		.addCase(setSelectedProducts, (_, { payload }) => payload.map((el) => el.toObject()))
		.addCase(setSelectedSizeOfProduct, handleSelectedSizeOfProduct)
})

function handleSelectedSizeOfProduct(productsOfRedux: IProductObject[], { payload }: IPayload<IShotSelectedProducts>) {
	return productsOfRedux.map((prd) => {
		const product = new ProductStructure(prd)
		const selectedSize = payload.find((el) => el.id === product.getId())?.selectedSize

		return selectedSize ? { ...product.toObject(), selectedSize } : { ...product.toObject(), selectedSize: '' }
	})
}

const main = combineReducers({
	products,
	error,
})
export default main
