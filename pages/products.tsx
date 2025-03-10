import CardList from '@/components/CardList'
import Filter from '@/components/Filter/Filter'
import Layout from '@/components/Layout'
import PRODUCTS from '@/constants/PRODUCTS'
import { useDevice, useReduceSelectors } from '@/hooks'
import language from '@/language'
import { productsSuccess } from '@/redux/main/mainActions'
import { wrapper } from '@/redux/store'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import { Box, Button, Modal, Paper } from '@mui/material'
import { useState } from 'react'

export default function ProductsPage() {
	const { products } = useReduceSelectors()
	const { isMobile, isTable } = useDevice()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Layout>
			{isMobile || isTable ? (
				<>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" sx={{ mb: 3 }} onClick={() => setIsOpen(true)}>
							{language.allFilters}
						</Button>
						<Button variant="text" sx={{ mb: 3 }}>
							{language.sort}
						</Button>
					</Box>
					<Modal sx={{ overflowY: 'scroll' }} open={isOpen} onClose={() => setIsOpen(false)}>
						<Box>
							<Box>
								<Paper sx={{ display: 'flex', height: 60, borderBottom: '1px solid rgba(0, 0, 0, 0.87)' }}>
									<Button sx={{ height: 1, flexGrow: 1 }} onClick={() => setIsOpen(false)} startIcon={<ArrowBackIcon />}>
										{language.hideFilters}
									</Button>
									<Button sx={{ height: 1 }} onClick={() => setIsOpen(false)} startIcon={<RotateLeftIcon />}>
										{language.reset}
									</Button>
								</Paper>
							</Box>
							<Filter />
						</Box>
					</Modal>
				</>
			) : (
				<Filter />
			)}
			<CardList products={products} />
		</Layout>
	)
}

export const getStaticProps = wrapper.getStaticProps((state) => () => {
	state.dispatch(productsSuccess(PRODUCTS))

	return {
		props: {},
	}
})
