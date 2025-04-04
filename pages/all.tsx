import serverApi from '@/api/serverApi'
import Catalog from '@/components/Catalog'
import Layout from '@/components/Layout'
import { wrapper } from '@/redux/store'
import dispatchData from '@api/serverHelpers/dispatchData'

export default function ProductsPage() {
	return (
		<Layout>
			<Catalog />
		</Layout>
	)
}

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
	const res = await serverApi.getProducts()

	dispatchData(dispatch, { products: res })

	return {
		props: {},
	}
})
