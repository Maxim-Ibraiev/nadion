import CardList from '@/components/CardList'
import Filter from '@/components/Filter/Filter'
import { useDevice } from '@/hooks'
import useProducts from '@/hooks/useProducts'
import language from '@/language'
import { Box, Button, Modal } from '@mui/material'
import { useState } from 'react'
import ProductSorter from '../ProductSorter'

export default function Catalog() {
	const { isMobile, isTable } = useDevice()
	const [isOpenFilter, setIsOpenFilter] = useState(false)
	const isUseModal = isMobile || isTable
	const { filteredProducts } = useProducts()

	return (
		<Box sx={isUseModal ? {} : { display: 'flex', gap: '56px' }}>
			{isUseModal ? (
				<>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" sx={{ mb: 3 }} onClick={() => setIsOpenFilter(true)}>
							{language.allFilters}
						</Button>
						<Box sx={{ mb: 3 }}>
							<ProductSorter />
						</Box>
					</Box>

					<Modal
						sx={{ overflowY: 'scroll', padding: 2 }}
						open={isOpenFilter}
						onClose={() => setIsOpenFilter(false)}
						aria-labelledby="modal-for-filter"
						aria-describedby="filter-products"
						disablePortal
						disableEnforceFocus
						disableAutoFocus
					>
						<Filter onRequestClose={() => setIsOpenFilter(false)} />
					</Modal>
				</>
			) : (
				<Filter />
			)}
			<Box sx={{ flexGrow: 1 }}>
				<CardList products={filteredProducts} />
			</Box>
		</Box>
	)
}
