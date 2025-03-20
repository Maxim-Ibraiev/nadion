import Catalog from '@/components/Catalog'
import Layout from '@/components/Layout'
import PRODUCTS from '@/constants/PRODUCTS'
import { productsSuccess } from '@/redux/main/mainActions'
import { wrapper } from '@/redux/store'

export default function Home() {
	return (
		<Layout>
			<Catalog />
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((state) => async () => {
	state.dispatch(productsSuccess(PRODUCTS))

	return {
		props: {},
	}
})
