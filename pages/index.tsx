import Layout from '@/components/Layout'
import ProductsRow from '@/components/ProductsRow'
import MainButton from '@/components/buttons/MainButton'
import GridCol from '@/components/gridTemplates/GridCol/GridCol'
import PRODUCTS from '@/constants/PRODUCTS'
import { useReduceSelectors } from '@/hooks'
import { productsSuccess } from '@/redux/main/mainActions'
import { wrapper } from '@/redux/store'
import { Box, Typography } from '@mui/material'
import heroImage from '@public/backgrounds/1.jpg'
import ContantImage2 from '@public/backgrounds/2.jpg'
import ContantImage3 from '@public/backgrounds/3.jpg'
import ContantImage4 from '@public/backgrounds/4.jpg'

function Home() {
	const { products } = useReduceSelectors()

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
							backgroundImage: `url(${ContantImage3.src})`,
							backgroundPosition: 'center',
							objectFit: 'contain',
						}}
					/>
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
					<div
						style={{
							backgroundColor: 'lightgray',
							backgroundImage: `url(${ContantImage2.src})`,
							backgroundPosition: 'center',
							objectFit: 'contain',
						}}
					/>
				</GridCol>
			</Box>
			<Box sx={{ display: 'flex', gap: '24px', justifyContent: 'center', my: { xs: '60px', sm: '120px' } }}>
				<MainButton>up tp 100</MainButton>
				<MainButton>up tp 200</MainButton>
				<MainButton>up tp 300</MainButton>
				<MainButton>up tp 400</MainButton>
			</Box>
			<ProductsRow products={products} />
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
					backgroundImage: `url(${ContantImage4.src})`,
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

			<ProductsRow products={products} />
		</Layout>
	)
}
export default Home
// Reinitialized existing Git repository

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => () => {
	dispatch(productsSuccess(PRODUCTS))

	return { props: {} }
})
