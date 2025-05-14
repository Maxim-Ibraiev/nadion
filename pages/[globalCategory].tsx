import serverApi from '@/api/serverApi'
import Catalog from '@/components/Catalog'
import Layout from '@/components/Layout'
import { categories } from '@/constants'
import type { Category } from '@/interfaces'
import { wrapper } from '@/redux/store'
import dispatchData from '@api/serverHelpers/dispatchData'

export default function Home() {
	return (
		<Layout>
			<Catalog />
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async ({ req }) => {
	const products = await serverApi.getProducts()

	dispatchData(dispatch, { products })

	const category = req.url?.split('?')[0].slice(1) || ''

	return {
		props: {},
		notFound: !categories.includes(category as Category),
	}
})
