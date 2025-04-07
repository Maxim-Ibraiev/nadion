import serverApi from '@/api/serverApi'
import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import ProductsRow from '@/components/ProductsRow'
import MainButton from '@/components/buttons/MainButton'
import GridCol from '@/components/gridTemplates/GridCol/GridCol'
import useProducts from '@/hooks/useProducts'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import dispatchData from '@api/serverHelpers/dispatchData'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import s from './mainPage.module.scss'

function Home() {
	const { products } = useProducts()

	return (
		<Layout>
			<Box className={s.hero}>
				<Typography variant="h1" fontSize={30}>
					Nadion
				</Typography>
				<Typography variant="body1" maxWidth="50%">
					Lorem ipsum dolor sit amet consectetur,aliquid alias ipsum et quibusdam iste voluptatum, quis cum optio odit facere magnam quod
					autem! Exercitationem consequuntur earum vitae.
				</Typography>
				<Box>
					<MainButton> Button</MainButton>
				</Box>
			</Box>
			<Box className={s.margin}>
				<GridCol>
					<div className={s.imageLint2} />
					<div>
						<ProductCard product={products[3]} />
					</div>
					<div>
						<ProductCard product={products[2]} />
					</div>
					<div>
						<ProductCard product={products[1]} />
					</div>
					<div>
						<ProductCard product={products[0]} />
					</div>
					<div className={s.imageLint1} />
				</GridCol>
			</Box>
			<Box className={s.priceLinks}>
				<Link href={routes.getPriceRange(0, 600)}>
					<MainButton style={{ cursor: 'inherit' }}> up to 600</MainButton>
				</Link>
				<Link href={routes.getPriceRange(0, 1000)}>
					<MainButton style={{ cursor: 'inherit' }}> up to 1000</MainButton>
				</Link>
				<Link href={routes.getPriceRange(0, 1500)}>
					<MainButton style={{ cursor: 'inherit' }}> up to 1500</MainButton>
				</Link>
				<Link href={routes.getPriceRange(0, 2000)}>
					<MainButton style={{ cursor: 'inherit' }}> up to 2000</MainButton>
				</Link>
			</Box>

			<ProductsRow products={products} width={117} />

			<Box className={s.banner}>
				<Typography mb={5} textAlign="center">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem sapiente voluptate labore porro facere aliquam
					voluptatem, qui beatae delectus
				</Typography>
				<MainButton className={s.button}>Pass to ...</MainButton>
			</Box>

			<Typography variant="h3" textAlign="center" my={{ xs: 5, md: 12 }}>
				The best to buy
			</Typography>

			<ProductsRow products={products} width={117} />
		</Layout>
	)
}
export default Home
// Reinitialized existing Git repository

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => async () => {
	const res = await serverApi.getProducts()

	dispatchData(dispatch, { products: res })

	return { props: {} }
})
