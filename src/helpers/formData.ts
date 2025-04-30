/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import type { ImageOptions } from '@/api/src/routes/admin/ImageCloud/ImageCloud'
import type { ProductToAdd } from '@/interfaces'

export interface IAddProductArgs {
	product: Omit<ProductToAdd, 'images'>
	imageOptions: ImageOptions
	files: File[]
}

export enum addProductList {
	product = 'product',
	imageOptions = 'imageOptions',
	images = 'images',
}

export default {
	setAddProduct: ({ product, files, imageOptions }: IAddProductArgs) => {
		const form = new FormData()
		form.append(addProductList.imageOptions, JSON.stringify(imageOptions))
		form.append(addProductList.product, JSON.stringify(product))

		files.forEach((file, ind) => {
			if (file) form.append(`image-${ind}`, file)
		})

		return form
	},

	getAddProduct: async (fields: { [key: string]: string[] }) => {
		const imageOptions = JSON.parse(fields.imageOptions ? fields.imageOptions[0] : '') as IAddProductArgs['imageOptions']
		const product = JSON.parse(fields.product ? fields.product[0] : '') as IAddProductArgs['product']

		if (fields.product && fields.product.length > 1)
			console.warn('Expected only one value of product, the rest will be ignored.', fields.product)
		if (fields.imageOptions && fields.imageOptions.length > 1)
			console.warn('Expected only one value of imageOptions, the rest will be ignored.', fields.imageOptions)

		return { product, imageOptions }
	},
}
