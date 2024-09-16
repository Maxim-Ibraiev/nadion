import Layout from '@/components/Layout'
import MainProduct from '@/components/MainProduct'
import NotFoundProduct from '@/components/NotFoundProduct'
import { useReduceSelectors } from '@/hooks'
import { useRouter } from 'next/router'
// import api from '../../src/api/serverApi'
import { REVALIDATE } from '@/constants'
import PRODUCTS from '@/constants/PRODUCTS'
import { dispatchData } from '@/helpers'
import { IProductObject, IResponse } from '@/interfaces'
import { getProductStructure } from '@/redux/selectors'
import { wrapper } from '@/redux/store'

export default function Product() {
	const router = useRouter()
	const idProduct = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id
	const { getProductById } = useReduceSelectors()
	const product = getProductById(idProduct || '')

	return <Layout>{product ? <MainProduct /> : <NotFoundProduct />}</Layout>
}

// const productsResponse = api.getProducts()

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
	const data = {
		products: { data: PRODUCTS, error: null, status: 200 } as IResponse<IProductObject[]>,
	}

	dispatchData(store.dispatch, data)

	return {
		props: {},
		revalidate: REVALIDATE,
	}
})

export async function getStaticPaths() {
	let paths: { params: { id: string } }[] = []

	try {
		const productsStructure = getProductStructure(PRODUCTS)
		paths = productsStructure.map((product) => ({
			params: { id: product.getId() },
		}))
	} catch (error) {
		console.error('Product fetch error in product/[id]: ', error)
	}

	return {
		paths,
		fallback: true,
	}
}
