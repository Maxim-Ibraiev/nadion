import Responser from '@/api/routes/Responser'
import { formData } from '@/helpers'
import type { addProductList } from '@/helpers/formData'
import { IProductObject, IResponse, type IError, type ProductToAdd } from '@/interfaces'
import { NextApiHandler } from 'next'
import Validation from '../../middleware/Validation'
import ImageCloud from '../ImageCloud'
import fileReader from './fileReader'
import { addProduct, removeProduct, updateProduct } from './productModel'

export const edit: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject | IError> | null = null
	const { files, fields } = await fileReader<addProductList>(req)
	const { product, imageOptions } = await formData.getProduct(fields)
	const { id } = product
	delete product.id

	try {
		// validation
		const { value: validateProduct, error: productError } = Validation.updateProduct.validate(product)
		const { value: validateImageOptions, error: optionsError } = Validation.imageOptions.validate(imageOptions)
		const { value: validateFiles, error: fileError } = Validation.fileList.validate(files, { abortEarly: false })
		const { value: validateId, error: idError } = Validation.id.validate(id)
		const validationError = fileError || optionsError || productError || idError
		if (validationError) response = Responser.getBadRequest(validationError)
		if (response) res.status(response.status).json(response)
		if (validationError) return

		// update product
		const options = { ...validateImageOptions, hash: validateId }
		const images = await ImageCloud.imageParser(validateFiles, options)
		const updatedProduct = await updateProduct(validateId, {
			...validateProduct,
			images,
		})

		// add image
		await ImageCloud.imageUploader(validateFiles, options)

		response = Responser.getOK(updatedProduct)

		res.status(response.status).json(response)
	} catch (error) {
		response = Responser.getServerError(error)
		res.status(response.status).json(response)
	}
}

export const add: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject | IError> | null = null
	const { fields, files } = await fileReader<addProductList>(req)
	const { product, imageOptions } = await formData.getProduct(fields)

	Object.assign(product, { creator: session.name })

	try {
		// validation
		const { value: validateProduct, error: productError } = Validation.productToAddWithoutImages.validate(product)
		const { value: validateImageOptions, error: optionsError } = Validation.imageOptions.validate(imageOptions)
		const { value: validateFiles, error: fileError } = Validation.fileListToAdd.validate(files, { abortEarly: false })
		const validationError = fileError || optionsError || productError
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
