import Catalog from '@/components/Catalog'
import Layout from '@/components/Layout'
import PRODUCTS from '@/constants/PRODUCTS'
import { productsSuccess } from '@/redux/main/mainActions'
import { wrapper } from '@/redux/store'

export default function ProductsPage() {
	return (
		<Layout>
			<Catalog />
		</Layout>
	)
}

export const getStaticProps = wrapper.getStaticProps((state) => () => {
	state.dispatch(productsSuccess(PRODUCTS))

	return {
		props: {},
	}
})
