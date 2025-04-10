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

	const getProductCollection = (collectionName: 'bestsellers'): IProduct[] => {
		if (collectionName === 'bestsellers') {
			return [
				'67dee1414af00200694bd95a',
				'67dae371acb6440069c7b3e2',
				'67dae0f0acb6440069c7b3ce',
				'643eeaf180c5ab00476474c6',
				'67dae368acb6440069c7b3de',
			]
				.map((el) => getProductById(el))
				.filter((el) => typeof el !== 'undefined')
		}

		return []
	}

	return {
		products,
		selectedProducts,
		categoredProducts,
		filteredProducts: filter.getQueryProducts(products),
		getProductsByModel,
		getProductById,
		getFilteredProducts,
		setSelectedProducts: setSelectedProductSwitch,
		getProductCollection,
	}
}
