import api from '@/api/api'
import serverApi from '@/api/serverApi'
import dispatchData from '@/api/src/serverHelpers/dispatchData'
import Layout from '@/components/Layout'
import NotFoundProduct from '@/components/NotFoundProduct'
import { useProducts } from '@/hooks'
import { wrapper } from '@/redux/store'
import AdminProductForm from './AdminProductForm'

interface IProps {
	id: string
}

export default function Edit({ id }: IProps) {
	const { getProductById } = useProducts()
	const product = getProductById(id)

	if (!product) {
		return (
			<Layout>
				<NotFoundProduct />
			</Layout>
		)
	}

	return (
		<AdminProductForm
			product={product}
			images={product.getImages()}
			handleEditSumbit={(value, fileList) =>
				api.admin.editProduct(value, fileList, {
					color: value.colors || product.getColor(),
					title: value.title || product.getTitle(),
					preImages: product.getImages(),
				})
			}
		/>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async ({ params }) => {
	const response = await serverApi.getProducts()
	const id = params?.id

	dispatchData(dispatch, { products: response })

	return {
		props: { id: id || '' },
	}
})
