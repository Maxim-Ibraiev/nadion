import DB_URL from '@/api/serverHelpers/DB_URL'
import { IProductObject, type ProductToAdd } from '@/interfaces'
import axios from 'axios'

export const addProduct = async (newProduct: ProductToAdd) =>
	axios.post<IProductObject>(`${DB_URL}/products`, newProduct).then((r) => r.data as IProductObject)

export const updateProduct = async (id: IProductObject['id'], newProduct: Partial<IProductObject>) =>
	axios.patch<IProductObject>(`${DB_URL}/products/${id}`, newProduct).then((r) => r.data as IProductObject)

export const removeProduct = async (id: string) => axios.delete(`${DB_URL}/products/${id}`).then((r) => r.data.data as IProductObject)
