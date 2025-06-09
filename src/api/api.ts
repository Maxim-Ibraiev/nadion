import formData from '@/helpers/formData'
import { IAdmin, ICallRequest, ILoginData, IProductObject, IResponse, ProductToUpdate, type ProductToAdd } from '@/interfaces'
import axios from 'axios'
import routes from '../routes'
import requestSymulator from './requestSymulator'
import type { ImageOptions } from './src/routes/admin/ImageCloud/ImageCloud'

const api = {
	admin: {
		login: (body: ILoginData): Promise<IResponse<IAdmin>> => axios.post(routes.api.adminLogin, body).then((res) => res.data),

		logout: (): Promise<IResponse<IAdmin>> => axios.post(routes.api.adminLogout, null).then((res) => res.data),

		// addProduct: (body: ProductToAdd) => axios.post(routes.api.adminProduct, body),

		editProduct: async (productToUpdate: ProductToUpdate, files: File[], imageOptions: ImageOptions) => {
			const data = formData.setProduct({ files, imageOptions, product: productToUpdate })

			return (await axios.patch(routes.api.adminProduct, data)).data as IResponse<IProductObject>
		},

		addProduct: async (product: Omit<ProductToAdd, 'images'>, files: File[], imageOptions: ImageOptions) => {
			const data = formData.setProduct({ product, files, imageOptions })

			return (await axios.post(routes.api.adminProduct, data)).data as IResponse<IProductObject>
		},

		deleteImage: async (id: string, imageList: string[]) =>
			axios.delete<IProductObject>(routes.api.adminImags, { data: { id, imageList } }),
	},

	callRequest: async (data: ICallRequest): Promise<IResponse<null>> => {
		const resolve = await requestSymulator(data)

		return resolve
	},
}

export default api
