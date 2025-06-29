import serverApi from '@/api/serverApi'
import cookieOptions from '@/api/serverHelpers/cookieOptions'
import dispatchData from '@/api/serverHelpers/dispatchData'
import AdminHeader from '@/components/adminComponents/AdminHeader'
import Catalog from '@/components/Catalog'
import Layout from '@/components/Layout'
import type { IAdmin } from '@/interfaces'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import { getIronSession } from 'iron-session'

export default function AddPage() {
	return (
		<Layout>
			<AdminHeader />
			<Catalog getLinkForProduct={routes.admin.toEditProduct} />
		</Layout>
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
