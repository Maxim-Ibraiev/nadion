import { IProductObject, IResponse, type IError } from '@/interfaces'
import RequestValidator from '@api/routes/RequestValidator'
import Responser from '@api/routes/Responser'
import { NextApiHandler } from 'next'
import { addProduct, updateProduct } from './productModel'

export const edit: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject | IError> | null = null

	try {
		const data = req.body.product
		const { id } = req.body
		delete data.id

		// validation
		const productError = RequestValidator.productUpdate(data).error
		const idError = RequestValidator.id(id).error
		if (productError) response = Responser.getBadRequest(productError)
		if (idError) response = Responser.getBadRequest(idError)
		if (response) res.status(response.status).json(response)
		if (response) return

		try {
			// update product
			const productResponse = await updateProduct(id, data)

			response = Responser.getOK(productResponse)
		} catch (error) {
			response = Responser.getServerError(error)
		}

		res.status(response.status).json(response)
	} catch (error) {
		response = Responser.getServerError(error)
		res.status(response.status).json(response)
	}
}

export const add: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject | IError> | null = null

	try {
		const data = req.body

		// validation
		const productError = RequestValidator.product(data).error
		if (productError) response = Responser.getBadRequest(productError)
		if (response) res.status(response.status).json(response)
		if (response) return

		try {
			// add products
			const productResponse = await addProduct(data)
			response = Responser.getOK(productResponse)
		} catch (error) {
			response = Responser.getServerError(error)
		}

		res.status(response.status).json(response)
	} catch (error) {
		response = Responser.getServerError(error)
		res.status(response.status).json(response)
	}
}
