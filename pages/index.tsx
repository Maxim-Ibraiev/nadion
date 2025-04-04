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

import heroImage from '@public/backgrounds/1.jpg'
import ContentImage2 from '@public/backgrounds/2.jpg'
import ContentImage3 from '@public/backgrounds/3.jpg'
import ContentImage4 from '@public/backgrounds/4.jpg'
import Link from 'next/link'

function Home() {
	const { products } = useProducts()

	return (
		<Layout>
			<Box
				sx={{
					width: 1,
					height: { xs: '400px', md: '700px' },

					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',

					gap: { xs: '10px', md: '30px' },
					mr: { xs: '20px', md: '80px' },
					pl: '20px',

					backgroundImage: `url(${heroImage.src})`,
					objectFit: 'cover',
				}}
			>
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
			<Box sx={{ my: { xs: '30px', sm: '60px' } }}>
				<GridCol>
					<div
						style={{
							backgroundColor: 'lightgray',
							backgroundImage: `url(${ContentImage3.src})`,
							backgroundPosition: 'center',
							objectFit: 'contain',
						}}
					/>
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
					<div
						style={{
							backgroundColor: 'lightgray',
							backgroundImage: `url(${ContentImage2.src})`,
							backgroundPosition: 'center',
							objectFit: 'contain',
						}}
					/>
				</GridCol>
			</Box>
			<Box
				sx={{
					display: 'flex',
					gap: '24px',
					justifyContent: 'center',
					my: { xs: '60px', sm: '120px' },
				}}
			>
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
			<Box
				sx={{
					width: '100%',
					height: '700px',
					bgcolor: 'lightgray',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					my: '25px',
					px: '20%',
					backgroundImage: `url(${ContentImage4.src})`,
				}}
			>
				<Typography sx={{ mb: '45px' }} textAlign="center">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem sapiente voluptate labore porro facere aliquam
					voluptatem, qui beatae delectus
				</Typography>
				<MainButton>Pass to ...</MainButton>
			</Box>

			<Typography variant="h3" textAlign="center" mt={15} mb={9}>
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
