import { IProductObject, type ProductToAdd } from '@/interfaces'
import axios from 'axios'

export const addProduct = async (newProduct: ProductToAdd) =>
	axios.post<IProductObject>('https://projectbf-29lq.onrender.com/products', newProduct).then((r) => r.data as IProductObject)

export const updateProduct = async (id: IProductObject['id'], newProduct: IProductObject) =>
	axios.patch<IProductObject>(`https://projectbf-29lq.onrender.com/products/${id}`, newProduct).then((r) => r.data as IProductObject)
export const removeProduct = async (id: string) =>
	axios.delete(`https://projectbf-29lq.onrender.com/products/${id}`).then((r) => r.data as IProductObject)
// export const listProducts = async () => productsSchemas.find()
