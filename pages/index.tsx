import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import MainButton from '@/components/buttons/MainButton'
import GridCol from '@/components/gridTemplates/GridCol/GridCol'
import GridScrollRow from '@/components/gridTemplates/GridScrollRow'
import PRODUCTS from '@/constants/PRODUCTS'
import { useReduceSelectors } from '@/hooks'
import { productsSuccess } from '@/redux/main/mainActions'
import { wrapper } from '@/redux/store'
import { Box, Typography } from '@mui/material'

function Home() {
	const { products } = useReduceSelectors()
	return (
		<Layout>
			<Box
				sx={{
					width: 1,
					height: { xs: '400px', md: '900px' },

					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',

					gap: { xs: '10px', md: '30px' },
					mr: { xs: '20px', md: '80px' },
					pl: '20px',

					bgcolor: 'lightgray',
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
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
					<div style={{ backgroundColor: 'lightgray' }} />
				</GridCol>
			</Box>
			<Box sx={{ display: 'flex', gap: '24px', justifyContent: 'center', my: { xs: '60px', sm: '120px' } }}>
				<MainButton>up tp 100</MainButton>
				<MainButton>up tp 200</MainButton>
				<MainButton>up tp 300</MainButton>
				<MainButton>up tp 400</MainButton>
			</Box>
			<GridScrollRow>
				{products.map((product) => (
					<div key={product.getId()} style={{ marginRight: '10px' }}>
						<ProductCard width={200} height={300} product={product} />
					</div>
				))}
			</GridScrollRow>
			<Box
				sx={{
					width: '100%',
					height: '830px',
					bgcolor: 'lightgray',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					my: '25px',
					px: '20%',
				}}
			>
				<Typography sx={{ mb: '45px' }} textAlign="center">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem sapiente voluptate labore porro facere aliquam
					voluptatem, qui beatae delectus
				</Typography>
				<MainButton>Pass to ...</MainButton>
			</Box>

			<Typography variant="h3" textAlign="center">
				The best to buy
			</Typography>
			<GridScrollRow>
				{products.map((product) => (
					<div key={product.getId()} style={{ marginRight: '10px' }}>
						<ProductCard width={200} height={300} product={product} />
					</div>
				))}
			</GridScrollRow>
		</Layout>
	)
}
export default Home
// Reinitialized existing Git repository

export const getStaticProps = wrapper.getStaticProps(({ dispatch }) => () => {
	dispatch(productsSuccess(PRODUCTS))

	return { props: {} }
})
