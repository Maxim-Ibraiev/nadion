/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import DB_URL from '@/api/serverHelpers/DB_URL'
import { IProductObject } from '@/interfaces'
import axios from 'axios'

export const listProducts = async (): Promise<IProductObject[]> => (await axios.get(`${DB_URL}/products`)).data.data as IProductObject[]

export default { listProducts }
