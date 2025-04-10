import serverApi from '@/api/serverApi'
import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import ProductsRow from '@/components/ProductsRow'
import MainButton from '@/components/buttons/MainButton'
import GridCol from '@/components/gridTemplates/GridCol/GridCol'
import useProducts from '@/hooks/useProducts'
import language from '@/language'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import dispatchData from '@api/serverHelpers/dispatchData'
import { Box, Typography } from '@mui/material'
import classNames from 'classnames'
import Link from 'next/link'
import s from './mainPage.module.scss'

function Home() {
	const { products, getProductById, categoredProducts, getProductCollection } = useProducts()

	return (
		<Layout>
			<Box className={s.hero}>
				<Box className={s.shadow} />
				<Typography className={s.logo} variant="h1">
					Nadion
				</Typography>
				<Typography className={s.slogan} variant="body1" fontSize={{ xs: 13, sm: 20 }}>
					{language.slogan}
				</Typography>
				<Box>
					<Link href={routes.all} className="button">
						{language.toProducts}
					</Link>
				</Box>
			</Box>

			<Box className={s.margin}>
				<GridCol>
					<Box className={s.imageLint1}>
						<Typography variant="h2" fontSize={{ xs: 30, sm: 40 }}>
							{language.maleClothes}
						</Typography>
						<Link href={routes.maleClothes} className="button">
							{language.toProducts}
						</Link>
					</Box>
					<div>
						<ProductCard product={getProductById('67dae0f0acb6440069c7b3ce') || products[3]} />
					</div>
					<div>
						<ProductCard product={getProductById('67dae357acb6440069c7b3d7') || products[10]} />
					</div>
					<div>
						<ProductCard product={getProductById('67dee4584af00200694bd960') || products[19]} />
					</div>
					<div>
						<ProductCard product={getProductById('67dee3414af00200694bd95e') || products[20]} />
					</div>
					<Box className={s.imageLint2}>
						<Typography variant="h2" fontSize={{ xs: 30, sm: 40 }}>
							{language.femaleClothes}
						</Typography>
						<Link href={routes.femaleClothes} className="button">
							{language.toProducts}
						</Link>
					</Box>
				</GridCol>
			</Box>

			<Box className={s.priceLinks}>
				<Link href={routes.getPriceRange(0, 600)} className="button">
					up to 600
				</Link>
				<Link href={routes.getPriceRange(0, 1000)} className="button">
					up to 1000
				</Link>
				<Link href={routes.getPriceRange(0, 1500)} className="button">
					up to 1500
				</Link>
				<Link href={routes.getPriceRange(0, 2000)} className="button">
					up to 2000
				</Link>
			</Box>

			<Typography variant="h3" textAlign="center" my={{ xs: 3 }}>
				{language.tShirt}
			</Typography>

			<ProductsRow products={categoredProducts.maleClothes} width={240} />

			<Box className={s.banner}>
				<Typography textAlign="center" variant="h2" fontSize={{ xs: 20, sm: 30 }}>
					{language.visitShope}
				</Typography>
				<Link href={routes.googleMap} className={classNames(s.center, 'button')}>
					{language.toMap}
				</Link>
			</Box>

			<Typography variant="h3" textAlign="center" my={{ xs: 3 }} fontSize={{ xs: 30, sm: 40 }}>
				{language.bestProduct}
			</Typography>

			<ProductsRow products={getProductCollection('bestsellers')} width={240} />
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
