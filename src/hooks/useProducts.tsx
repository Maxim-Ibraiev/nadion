import { HandlerError, getFilteredProducts } from '@/helpers'
import useFilter from '@/hooks/useFilter'
import useReduceSelectors from '@/hooks/useReduceSelectors'
import type { IProduct } from '@/interfaces'

export default function useProducts() {
	const { products, selectedProducts, setSelectedProducts } = useReduceSelectors()
	const categoredProducts = {
		maleClothes: getFilteredProducts(products, { globalCategory: ['maleClothes'] }),
		femaleClothes: getFilteredProducts(products, { globalCategory: ['femaleClothes'] }),
		childrenClothes: getFilteredProducts(products, { globalCategory: ['childrenClothes'] }),
		all: getFilteredProducts(products, { globalCategory: ['all'] }),
	}
	const filter = useFilter()

	const getProductsByModel = (model: string) => products.filter((product) => product.getModel() === model)
	const getProductById = (id: string) => products.find((el) => el.getId() === id)

	function setSelectedProductSwitch(metoth: 'add' | 'delete', payload: IProduct): void
	function setSelectedProductSwitch(metoth: 'reset'): void
	function setSelectedProductSwitch(metoth: 'add' | 'delete' | 'reset', payload?: IProduct) {
		switch (metoth) {
			case 'delete':
				setSelectedProducts(selectedProducts.filter((el) => el.getId() !== payload?.getId()))
				break

			case 'add':
				if (payload) setSelectedProducts(selectedProducts.concat(payload))
				break

			case 'reset':
				setSelectedProducts([])
				break

			default:
				HandlerError.addAction(`setSelectedProductSwitch: ${metoth} is not a valid method.`)
				break
		}
	}

	return {
		products,
		selectedProducts,
		categoredProducts,
		getProductsByModel,
		getProductById,
		setSelectedProducts: setSelectedProductSwitch,
		filteredProducts: filter.getQueryProducts(products),
	}
}
