import actions from '@/redux/allActions'
import { useDispatch } from 'react-redux'
import { IShotSelectedProducts } from '../interfaces'

export default function useReduceActions() {
	const dispatch = useDispatch()

	const setSelectedSizeOfProduct = (payload: IShotSelectedProducts) => dispatch(actions.setSelectedSizeOfProduct(payload))

	return { setSelectedSizeOfProduct }
}
