import PRODUCTS from '@/constants/PRODUCTS'
import { IProductObject, IResponse } from '@/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../Responser'
import { listProducts } from './productsModel'

export async function getProducts(req?: NextApiRequest, res?: NextApiResponse): Promise<IResponse<IProductObject[]>> {
	try {
		const products = await listProducts()

		const response = Responser.getOK(products)

		if (res) res.status(response.status).json(response)

		return response
	} catch (e) {
		const response = Responser.getServerError(e)

		if (res) res.status(response.status).json(response)

		const fallback: IResponse<IProductObject[]> = { data: PRODUCTS, error: response.error, status: response.status }
		console.warn('Use fallback products', { response })

		return fallback
	}
}

export default { getProducts }
