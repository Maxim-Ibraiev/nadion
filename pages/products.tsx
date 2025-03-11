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
	const [isOpenFilter, setIsOpenFilter] = useState(false)
	const [isOpenSort, setIsOpenSort]= useState(false)
	const isShowFilter = isMobile || isTable



	return (
		<Layout>
			<Box sx={isShowFilter ?{}:{display: 'flex', gap: '56px'}}>

			{isShowFilter ? (
				<>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" sx={{ mb: 3 }} onClick={() => setIsOpenFilter(true)}>
							{language.allFilters}
						</Button>
						<Button variant="text" sx={{ mb: 3 }} onClick={()=> setIsOpenSort(true)}>
							{language.sort}
						</Button>
					</Box>

					<Modal sx={{ overflowY: 'scroll' }} open={isOpenFilter} onClose={() => setIsOpenFilter(false)}>
						<Box>
							<Box>
								<Paper sx={{ display: 'flex', height: 60, borderBottom: '1px solid rgba(0, 0, 0, 0.87)' }}>
									<Button sx={{ height: 1, flexGrow: 1 }} onClick={() => setIsOpenFilter(false)} startIcon={<ArrowBackIcon />}>
										{language.hideFilters}
									</Button>
									<Button sx={{ height: 1 }} onClick={() => setIsOpenFilter(false)} startIcon={<RotateLeftIcon />}>
										{language.reset}
									</Button>
								</Paper>
							</Box>
							<Filter />
						</Box>
					</Modal>

					<Modal open={isOpenSort} onClose={()=>setIsOpenSort(false)} >
						<Paper sx={{width: '300px', m: '150px auto 0', }}>
							{['sort by price', 'sort by popularity'].map(item=> <Button key={item} fullWidth	 onClick={()=> {
								setIsOpenSort(false)
							}}>{item}</Button>)}
						</Paper>
					</Modal>
				</>
			) : (
				<Filter />
			)}
				<Box sx={{flexGrow: 1}}>
			<CardList products={products} /></Box>
			</Box>

		</Layout>
	)
}

export const getStaticProps = wrapper.getStaticProps((state) => () => {
	state.dispatch(productsSuccess(PRODUCTS))

	return {
		props: {},
	}
})
