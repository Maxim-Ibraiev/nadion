import { createAction } from '@reduxjs/toolkit'
import type { IError, IProduct, IProductObject, IShotSelectedProducts } from '../../interfaces'

export const productsSuccess = createAction<IProductObject[]>('main/productsSuccess')
export const productsError = createAction<IError | null>('main/productsError')

export const selectedProductsSuccess = createAction<IProduct[]>('main/selectedProductsSuccess')
export const selectedProductsError = createAction<IError | null>('main/selectedProductsError')

export const setSelectedProducts = createAction<IProduct[]>('main/selectedProducts')
export const setSelectedSizeOfProduct = createAction<IShotSelectedProducts>('main/setSelectedSizeOfProduct')
