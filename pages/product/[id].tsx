import Layout from '@/components/Layout'
import MainProduct from '@/components/MainProduct'
import NotFoundProduct from '@/components/NotFoundProduct'
import { useProducts } from '@/hooks'
import { useRouter } from 'next/router'
import serverApi from '@/api/serverApi'
import dispatchData from '@/api/serverHelpers/dispatchData'
import { REVALIDATE } from '@/constants'
import PRODUCTS from '@/constants/PRODUCTS'
import { HandlerError } from '@/helpers'
import { getProductStructure } from '@/redux/selectors'
import { wrapper } from '@/redux/store'

export default function Product() {
	const router = useRouter()
	const idProduct = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
	const { getProductById } = useProducts()
	const product = getProductById(idProduct || '')

	return <Layout>{product ? <MainProduct /> : <NotFoundProduct />}</Layout>
}

// const productsResponse = api.getProducts()

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
	const res = await serverApi.getProducts()

	dispatchData(dispatch, { products: res })

	return {
		props: {},
		revalidate: REVALIDATE,
	}
})

export async function getStaticPaths() {
	let paths: { params: { id: string } }[] = []

	try {
		const res = await serverApi.getProducts()

		if (res.data) {
			const productsStructure = getProductStructure(PRODUCTS)
			paths = productsStructure.map((product) => ({
				params: { id: product.getId() },
			}))
		}
	} catch (error) {
		HandlerError.addAction('Product fetch error in product/[id]: ', error)
	}

	return {
		paths,
		fallback: true,
	}
}
