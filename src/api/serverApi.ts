import { IProductObject, IResponse } from '@/interfaces'
import * as productsController from '@api/routes/products/productsController'

const serverApi = {
	getProducts: async (): Promise<IResponse<IProductObject[]>> => productsController.getProducts(),
}

export default serverApi
