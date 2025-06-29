import formData from '@/helpers/formData'
import { IAdmin, ILoginData, IProductObject, IResponse, ProductToUpdate, type IProduct, type ProductToAdd } from '@/interfaces'
import routes from '@/routes'
import axios from 'axios'
import type { ImageOptions } from './routes/admin/ImageCloud/ImageCloud'

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

		deleteProduct: async (id: ReturnType<IProduct['getId']>) => axios.delete<IProductObject>(routes.api.adminProduct, { params: { id } }),

		deleteImage: async (id: ReturnType<IProduct['getId']>, imageList: string[]) =>
			axios.delete<IProductObject>(routes.api.adminImags, { data: { id, imageList } }),
	},
}

export default api
