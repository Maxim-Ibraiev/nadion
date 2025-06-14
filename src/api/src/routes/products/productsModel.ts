/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
import { IProductObject } from '@/interfaces'
import axios from 'axios'

export const listProducts = async (): Promise<IProductObject[]> =>
	(await axios.get('https://projectbf-29lq.onrender.com/products')).data.data as IProductObject[]

export default { listProducts }
