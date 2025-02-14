import { ProductStructure } from '@/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { IProduct } from '../interfaces'
import * as actions from '../redux/main/mainActions'
import { getSelectedProducts } from '../redux/selectors'

interface ISetSelectedProducts {
	delete: (id: ReturnType<IProduct['getId']>) => void
	add: (product: IProduct) => void
	set: (products: IProduct[]) => void
}

export default function useSelectedProducts(): [ProductStructure[], ISetSelectedProducts] {
	const selectedProductFromRedux = useSelector(getSelectedProducts)
	const dispatch = useDispatch()

	const setSelectedProductFromRedux = (products: IProduct[]) => {
		dispatch(actions.setSelectedProducts(products))
	}

	const setSelectedProducts: ISetSelectedProducts = {
		delete: (id) => setSelectedProductFromRedux(selectedProductFromRedux.filter((el) => el.getId() !== id)),
		add: (product) => setSelectedProductFromRedux(selectedProductFromRedux.concat(product)),
		set: (products) => setSelectedProductFromRedux(products),
	}

	return [selectedProductFromRedux, setSelectedProducts]
}
