import { getProducts } from '@/api/routes/products/productsController'
import type { NextApiRequest, NextApiResponse } from 'next'
import Validation from '../../middleware/Validation'
import Responser from '../../Responser'
import ImageCloud from '../ImageCloud'
import { updateProduct } from '../product/productModel'

// eslint-disable-next-line import/prefer-default-export
export const imagesDelete = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id, imageList } = req.body as { id: string; imageList: string[] }
	let response = Responser.getNotFound(null)

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
		await ImageCloud.deleteImagesByList(ValidatedDeletList)

		const newImages = product.images.filter((el) => ValidatedDeletList.some((imageToDelete) => imageToDelete !== el.original))
		const updatedProduct = await updateProduct(product.id, { images: newImages })

		response = Responser.getOK(updatedProduct)
	} else {
		response = Responser.getNotFound({ data: { product }, message: 'not found product' })
	}

	res.status(response.status).json(response)
}
