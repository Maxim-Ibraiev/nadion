import type { IProduct } from '@/interfaces'
import * as selectors from '@/redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/main/mainActions'

export default function useReduceSelectors() {
	const products = useSelector(selectors.getProducts)
	const selectedProducts = useSelector(selectors.getSelectedProducts)
	const error = useSelector(selectors.getError)

	const dispatch = useDispatch()

	const setSelectedProducts = (newSelectedProducts: IProduct[]) => {
		dispatch(actions.setSelectedProducts(newSelectedProducts))
	}
	return {
		products,
		selectedProducts,
		error,
		setSelectedProducts,
	}
}
