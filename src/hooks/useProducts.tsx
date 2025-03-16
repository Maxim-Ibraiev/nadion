import { useReduceSelectors } from '@/hooks/index'
import useFilter from '@/hooks/useFilter'


export default function useProducts() {
	const { products,selectedProducts } = useReduceSelectors()

	const filter = useFilter()

	return {products,selectedProducts,  filteredProducts: filter.getQueryProducts(products)}
}
