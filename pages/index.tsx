import Layout from '@/components/Layout'
import Link from '@/lib/next/Link'
import { productsSuccess } from '@/redux/main/mainActions'
import { wrapper } from '@/redux/store'
import routes from '@/routes'

function Home() {
	return (
		<Layout>
			<p>Home page</p>
			<p>
				<Link href={routes.products}>Products</Link>
			</p>
		</Layout>
	)
}
export default Home
// Reinitialized existing Git repository

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => () => {
	dispatch(productsSuccess([]))

	return { props: {} }
})
