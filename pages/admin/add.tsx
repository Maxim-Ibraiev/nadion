import serverApi from '@/api/serverApi'
import cookieOptions from '@/api/src/serverHelpers/cookieOptions'
import dispatchData from '@/api/src/serverHelpers/dispatchData'
import type { IAdmin } from '@/interfaces'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import { getIronSession } from 'iron-session'
import api from '../../src/api/api'
import AdminProductForm from './AdminProductForm'

export default function AddPage() {
	return (
		<AdminProductForm
			handleAddSumbit={(value, fileList) => api.admin.addProduct(value, fileList, { color: value.colors, title: value.title })}
		/>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async ({ req, res }) => {
	const session = await getIronSession<IAdmin>(req, res, cookieOptions)

	if (!session.auth) {
		return {
			redirect: { destination: routes.admin.login, permanent: true },
		}
	}

	const products = await serverApi.getProducts()

	dispatchData(dispatch, { products })

	return {
		props: {},
	}
})
