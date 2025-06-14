// import getProductStructure from "@/helpers/ProductStructure";
import HendlerError from '@/helpers/HandlerError'
import { IProductObject, IResponse, IShoppingBag } from '@/interfaces'
import * as actions from '@/redux/main/mainActions'
import { Dispatch } from '@reduxjs/toolkit'

interface IDispatchData {
	products: IResponse<IProductObject[]>
	shoppingBag?: IResponse<IShoppingBag>
}

export default async function dispatchData(dispatch: Dispatch, { products }: IDispatchData) {
	if (products.error) {
		dispatch(actions.productsError(products.error))
		console.warn({
			products: JSON.stringify(products),
		})
		HendlerError.addAction('DispatchData error')
	}

	if (products.data) dispatch(actions.productsSuccess(products.data))
}
