import formData from '@/helpers/formData'
import {
	IAdmin,
	ICallRequest,
	ILoginData,
	IProduct,
	IProductObject,
	IResponse,
	IShoppingBag,
	ProductToUpdate,
	type ProductToAdd,
} from '@/interfaces'
import axios, { AxiosResponse } from 'axios'
import { getShotSelectedProducts } from '../helpers'
import routes from '../routes'
import requestSymulator from './requestSymulator'
import type { ImageOptions } from './src/routes/admin/ImageCloud/ImageCloud'

const api = {
	admin: {
		// login: (body: ILoginData): Promise<IResponse<IAdmin>> => axios.post(routes.api.adminLogin, body).then((res) => res.data),

		// logout: (): Promise<IResponse<IAdmin>> => axios.get(routes.api.adminLogin).then((res) => res.data),

		// addProduct: (body: ProductToAdd) => axios.post(routes.api.adminProduct, body),

		// editProduct: (id: string, productToUpdate: ProductToUpdate, files: File[], options: ImageOptions) => {
		// 	const form = new FormData()
		// 	form.append('id', JSON.stringify(id))
		// 	form.append('imageOptions', JSON.stringify(options))

		// 	files.forEach((file, ind) => {
		// 		if (file) form.append(`image-${ind}`, file)
		// 	})

		// 	axios.patch(routes.api.adminProduct, { id, product: productToUpdate })
		// },

		addProduct: async (product: Omit<ProductToAdd, 'images'>, files: File[], imageOptions: ImageOptions) => {
			const data = formData.setAddProduct({ product, files, imageOptions })

			return (await axios.post(routes.api.adminProduct, data)).data as IResponse<IProductObject>
		},
	},

	callRequest: async (data: ICallRequest): Promise<IResponse<null>> => {
		const resolve = await requestSymulator(data)

		return resolve
	},
}

export default api
