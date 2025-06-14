import { getProducts } from '@/api/routes/products/productsController'
import cookieOptions from '@/api/serverHelpers/cookieOptions'
import type { IAdmin } from '@/interfaces'
import { getIronSession } from 'iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'
import Validation from '../../middleware/Validation'
import Responser from '../../Responser'
import ImageCloud from '../ImageCloud'
import { updateProduct } from '../product/productModel'

// eslint-disable-next-line import/prefer-default-export
export const imagesDelete = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id, imageList } = req.body as { id: string; imageList: string[] }
	let response = Responser.getNotFound(null)

	const session = await getIronSession<IAdmin>(req, res, cookieOptions)

	if (!session.auth) {
		response = Responser.getForbidden(null)
		res.status(response.status).json(response)
		return
	}

	// validation
	const { value: validatedId, error: idError } = Validation.id.validate(id)
	const { value: ValidatedDeletList, error: ListError } = Validation.imageDeleteList.validate(imageList)
	const ValidateError = ListError || idError
	if (ValidateError) {
		response = Responser.getBadRequest(ValidateError)
		res.status(response.status).json(response)
		return
	}

	const products = (await getProducts()).data
	const product = products?.find((el) => el.id === validatedId)

	// delete
	if (product) {
		const promises = ValidatedDeletList.reduce((acc, element) => {
			const split = element.split('/')
			const imageName = element.includes('http') ? split.at(split.length - 1) : element
			const imageItem = product.images.find((el) => el.original === imageName)

			if (imageItem) {
				acc.push(ImageCloud.deleteImage(imageItem))
			}

			return acc
		}, [] as Promise<{ result: string }>[])

		await Promise.all(promises)

		const newImages = product.images.filter((el) => ValidatedDeletList.some((imageToDelete) => imageToDelete !== el.original))
		const updatedProduct = await updateProduct(product.id, { images: newImages })

		response = Responser.getOK(updatedProduct)
	}

	res.status(response.status).json(response)
}
