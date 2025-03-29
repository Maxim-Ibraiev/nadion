import { getFilteredProducts } from '@/helpers'
import { useReduceSelectors } from '@/hooks/index'
import useFilter from '@/hooks/useFilter'

export default function useProducts() {
	const { products, selectedProducts } = useReduceSelectors()
	const categoredProducts = {
		maleClothes: getFilteredProducts(products, { globalCategory: ['maleClothes'] }),
		femaleClothes: getFilteredProducts(products, { globalCategory: ['femaleClothes'] }),
		childrenClothes: getFilteredProducts(products, { globalCategory: ['childrenClothes'] }),
		all: getFilteredProducts(products, { globalCategory: ['all'] }),
	}
	const filter = useFilter()

	return { products, selectedProducts, filteredProducts: filter.getQueryProducts(products), categoredProducts }
}
