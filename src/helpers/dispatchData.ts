// import getProductStructure from "@/helpers/ProductStructure";
import * as actions from '@/redux/main/mainActions'
import { Dispatch } from '@reduxjs/toolkit'
import { IProductObject, IResponse, IShoppingBag } from '../interfaces'

interface IDispatchData {
	products: IResponse<IProductObject[]>
	shoppingBag?: IResponse<IShoppingBag>
}

export default async function dispatchData(dispatch: Dispatch, { shoppingBag, products }: IDispatchData) {
	const isNeedToHandleError = (products.error || shoppingBag?.error) && process.env.NODE_ENV === 'development'

	if (isNeedToHandleError) {
		dispatch(actions.productsError(products.error))

		console.warn({
			products: JSON.stringify(products),
			shoppingBag: JSON.stringify(shoppingBag),
		})

		throw new Error(`DispatchData error.`)
	}
	if (products.data) dispatch(actions.productsSuccess(products.data))

	// ! todo
	// if (shoppingBag) {
	//   const productList = getProductStructure(products.data);
	//   const selectedProducts = shoppingBag.data.selectedProducts.map((el) =>
	//     productList.find((prd) => prd.getId() === el.id)
	//   );

	//   dispatch(actions.selectedProductsSuccess(selectedProducts));
	//   dispatch(
	//     actions.setSelectedSizeOfProduct(shoppingBag.data.selectedProducts)
	//   );
	// }
}
