import httpStatusCodes from '@/api/src/httpStatusCodes'
import cookieOptions from '@/api/src/serverHelpers/cookieOptions'
import { formData } from '@/helpers'
import type { addProductList } from '@/helpers/formData'
import { IProductObject, IResponse, type IAdmin, type IError, type ProductToAdd } from '@/interfaces'
import Responser from '@api/routes/Responser'
import { getIronSession } from 'iron-session'
import { NextApiHandler } from 'next'
import Validation from '../../middleware/Validation'
import ImageCloud from '../ImageCloud'
import type { ImageOptions } from '../ImageCloud/ImageCloud'
import fileReader from './fileReader'
import { addProduct, removeProduct, updateProduct } from './productModel'

export const edit: NextApiHandler = async (req, res) => {}
/*
export const edit: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject | IError> | null = null
	const { files, fields } = await fileReader(req)
	const { id } = req.body
	const imageOptions = JSON.parse(fields.imageOptions ? fields.imageOptions[0] : 'null') as ImageOptions
	const product = JSON.parse(fields.product ? fields.product[0] : '') as IProductObject
	// delete product.id

	try {
		// validation
		const productError = Validation.updateProduct.validate(product).error
		const fileError = Validation.fileListToUpdate.validate(files).error
		const optionsError = Validation.imageOptions.validate(imageOptions).error
		const idError = Validation.id.validate(id).error
		const validationError = productError || fileError || optionsError || idError
		if (validationError) response = Responser.getBadRequest(validationError)
		if (idError) response = Responser.getBadRequest(idError)
		if (response) res.status(response.status).json(response)
		if (response) return

		// update product
		const productResponse = await updateProduct(id, {
			...product,
			images: ImageCloud.imageParser(files, imageOptions),
		})

		// delete images
		product.images.forEach((image) => {
			const isNotMatch = !imageOptions.preImages?.some((el) => el.original.includes(image.original))
			if (isNotMatch) {
				ImageCloud.deleteImage(image)
				console.log('image delete:', image)
			}
		})

		// add image
		await ImageCloud.imageUploader(files, imageOptions)

		response = Responser.getOK(productResponse)

		res.status(response.status).json(response)
	} catch (error) {
		response = Responser.getServerError(error)
		res.status(response.status).json(response)
	}
}
*/

export const add: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject | IError> | null = null
	const { fields, files } = await fileReader<addProductList>(req)
	const { product, imageOptions } = await formData.getAddProduct(fields)

	const session = await getIronSession<IAdmin>(req, res, cookieOptions)
	Object.assign(product, { creator: session.name })

	try {
		// validation
		const { value: validateProduct, error: productError } = Validation.productToAddWithoutImages.validate(product)
		const { value: validateImageOptions, error: optionsError } = Validation.imageOptions.validate(imageOptions)
		const { value: validateFiles, error: fileError } = Validation.fileListToAdd.validate(files, { abortEarly: false })
		const validationError = fileError || optionsError || productError
		console.log(' validationError:', validationError)
		if (validationError) response = Responser.getBadRequest(validationError)
		if (response) res.status(response.status).json(response)
		if (validationError) return

		// add products
		const imageOptionsWithHash = { ...validateImageOptions, hash: Math.floor(Math.random() * 10000).toString() }
		const images = await ImageCloud.imageParser(validateFiles, imageOptionsWithHash)
		const productToAdd: ProductToAdd = { ...validateProduct, images }
		const productResponse = await addProduct(productToAdd)

		response = Responser.getOK<IProductObject>(productResponse)

		try {
			// add images
			ImageCloud.imageUploader(validateFiles, imageOptionsWithHash)
		} catch (error) {
			// delete created product
			removeProduct(productResponse.id)

			response = Responser.getServerError(error)
		}

		res.status(response.status).json(response)
	} catch (error) {
		response = Responser.getServerError(error)
		res.status(response.status).json(response)
	}
}
