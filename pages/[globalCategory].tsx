import serverApi from '@/api/serverApi'
import Catalog from '@/components/Catalog'
import Layout from '@/components/Layout'
import { categories, REVALIDATE } from '@/constants'
import { wrapper } from '@/redux/store'
import dispatchData from '@api/serverHelpers/dispatchData'

export default function Home() {
	return (
		<Layout>
			<Catalog />
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths: { params: { globalCategory: string } }[] = []
	categories.map((el) => paths.push({ params: { globalCategory: el } }))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
	const products = await serverApi.getProducts()

	dispatchData(dispatch, { products })

	return {
		props: {},
		revalidate: REVALIDATE,
	}
})
