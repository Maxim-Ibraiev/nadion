import serverApi from '@/api/serverApi'
import Catalog from '@/components/Catalog'
import Layout from '@/components/Layout'
import { wrapper } from '@/redux/store'
import dispatchData from '@api/serverHelpers/dispatchData'

export default function Home() {
	return (
		<Layout>
			<Catalog />
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async () => {
	const products = await serverApi.getProducts()

	dispatchData(dispatch, { products })

	return {
		props: {},
	}
})
