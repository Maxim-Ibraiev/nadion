/* eslint-disable import/prefer-default-export */
import { IProductObject, IResponse, type IError } from '@/interfaces'
import Validation from '@api/routes/middleware/Validation'
import { NextApiHandler } from 'next'
import serverApi from '../../../../serverApi'
import Responser from '../../Responser'
import ImageCloud from '../ImageCloud'
import { ImageOptions } from '../ImageCloud/ImageCloud'
import fileReader from '../product/fileReader'

export const updateAdd: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject['images'] | IError> | null = null
	const { files, fields } = await fileReader(req)
	const imageOptions = JSON.parse(fields.imageOptions ? fields.imageOptions[0] : '')

	imageOptions.id = Math.round(Math.random() * 10000).toString()

	// validation
	const fileError = Validation.fileListToAdd.validate(files, { abortEarly: false }).error
	const optionsError = Validation.imageOptions.validate(imageOptions).error
	const validationError = fileError || optionsError
	if (validationError) response = Responser.getBadRequest(validationError)
	if (response) res.status(response.status).json(response)
	if (response) return

	try {
		// add image
		await ImageCloud.imageUploader(files, imageOptions)

		response = Responser.getOK(ImageCloud.imageParser(files, imageOptions))

		res.status(response.status).json(response)
	} catch (error) {
		response = Responser.getServerError(error)
		res.status(response.status).json(response)
	}
}

export const updateImages: NextApiHandler = async (req, res) => {
	let response: IResponse<IProductObject['images'] | IError> | null = null
	const { files, fields } = await fileReader(req)
	const productId = JSON.parse(fields.id ? fields.id[0] : 'null')
	const imageOptions = JSON.parse(fields.imageOptions ? fields.imageOptions[0] : 'null') as ImageOptions

	imageOptions.id = Math.round(Math.random() * 10000).toString()

	// validation
	const fileError = Validation.fileListToUpdate.validate(files).error
	const optionsError = Validation.imageOptions.validate(imageOptions).error
	const idError = Validation.id.validate(productId).error
	const validationError = fileError || optionsError || idError
	if (validationError) response = Responser.getBadRequest(validationError)
	if (response) res.status(response.status).json(response)
	if (response) return

	try {
		const products = await serverApi.getProducts()
		const product = products.data?.find((el) => el.id === productId)

		if (!product) {
			response = Responser.getNotFound({ data: { product, productId }, message: 'Product not found' })
			res.status(response.status).json(response)
			return
		}

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

		response = Responser.getOK(ImageCloud.imageParser(files, imageOptions))

		res.status(response.status).json(response)
	} catch (error) {
		response = Responser.getServerError(error)
		res.status(response.status).json(response)
	}
}
