import * as productsController from '@/api/routes/products/productsController'
import { IProductObject, IResponse } from '@/interfaces'

const serverApi = {
	getProducts: async (): Promise<IResponse<IProductObject[]>> => productsController.getProducts(),
}

export default serverApi
