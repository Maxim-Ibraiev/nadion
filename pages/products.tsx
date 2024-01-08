import CardList from '@/components/CardList'
import Filter from '@/components/Filter/Filter'
import Layout from '@/components/Layout'
import PRODUCTS from '@/constants/PRODUCTS'
import { useReduceSelectors } from '@/hooks'
import { productsSuccess } from '@/redux/main/mainActions'
import { wrapper } from '@/redux/store'

export default function ProductsPage() {
	const { products } = useReduceSelectors()

	return (
		<Layout>
			<CardList products={products} />
			<Filter />
		</Layout>
	)
}

export const getStaticProps = wrapper.getStaticProps((state) => () => {
	state.dispatch(productsSuccess(PRODUCTS))

	return {
		props: {},
	}
})
