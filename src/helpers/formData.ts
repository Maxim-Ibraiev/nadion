/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import type { ImageOptions } from '@/api/routes/admin/ImageCloud/ImageCloud'
import { MAX_IMAGE_LENGTH } from '@/constants'
import HandlerError from '@/helpers/HandlerError'
import type { IProductObject, ProductToAdd } from '@/interfaces'
import type { IFileList } from '@/interfaces/interfaces'
import { File as FileForm } from 'formidable'

export interface IAddProductArgs {
	product: Omit<Partial<IProductObject>, 'images'>
	imageOptions: ImageOptions
	files: File[]
}

export enum addProductList {
	product = 'product',
	imageOptions = 'imageOptions',
	images = 'images',
}

export default {
	setProduct: ({ product, files, imageOptions }: IAddProductArgs) => {
		const form = new FormData()
		form.append(addProductList.imageOptions, JSON.stringify(imageOptions))
		form.append(addProductList.product, JSON.stringify(product))

		files.forEach((file, ind) => {
			if (file) form.append(getKeyOfFileList(ind), file)
		})

		return form
	},

	getProduct: async (fields: { [key: string]: string[] }) => {
		const imageOptions = JSON.parse(fields.imageOptions ? fields.imageOptions[0] : '') as IAddProductArgs['imageOptions']
		const product = JSON.parse(fields.product ? fields.product[0] : '') as IAddProductArgs['product']

		if (fields.product && fields.product.length > 1)
			console.warn('Expected only one value of product, the rest will be ignored.', fields.product)
		if (fields.imageOptions && fields.imageOptions.length > 1)
			console.warn('Expected only one value of imageOptions, the rest will be ignored.', fields.imageOptions)

		return { product, imageOptions }
	},

	getFileArray: (files: IFileList) => {
		const arr: ([FileForm] | null)[] = []

		for (let index = 0; index < MAX_IMAGE_LENGTH; index++) {
			const value = files[getKeyOfFileList(index)] || null
			arr.push(value)
		}

		return arr
	},
}

function getKeyOfFileList(index: number) {
	if (index >= MAX_IMAGE_LENGTH && index < 0) {
		HandlerError.addAction(
			`getKeyOfFileList: index should be equal or less done MAX_IMAGE_LENGTH. index:${index}, MAX_IMAGE_LENGTH:${MAX_IMAGE_LENGTH}`
		)
	}
	return `image-${index}` as keyof IFileList
}
