import CardList from '@/components/CardList'
import Filter from '@/components/Filter/Filter'
import { useDevice } from '@/hooks'
import useFilter from '@/hooks/useFilter'
import useProducts from '@/hooks/useProducts'
import language from '@/language'
import { Box, Button, Modal, Paper } from '@mui/material'
import { useState } from 'react'

export default function Catalog() {
	const { isMobile, isTable } = useDevice()
	const [isOpenFilter, setIsOpenFilter] = useState(false)
	const [isOpenSort, setIsOpenSort] = useState(false)
	const isUseModal = isMobile || isTable
	const { filteredProducts } = useProducts()
	const filter = useFilter()

	return (
		<Box sx={isUseModal ? {} : { display: 'flex', gap: '56px' }}>
			{isUseModal ? (
				<>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" sx={{ mb: 3 }} onClick={() => setIsOpenFilter(true)}>
							{language.allFilters}
						</Button>
						<Button variant="text" sx={{ mb: 3 }} onClick={() => setIsOpenSort(true)}>
							{language.sort}
						</Button>
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

					<Modal
						open={isOpenSort}
						onClose={() => setIsOpenSort(false)}
						aria-labelledby="modal-for-sort"
						aria-describedby="sort-products"
						disablePortal
						disableEnforceFocus
						disableAutoFocus
					>
						<Paper sx={{ width: '300px', m: '150px auto 0' }}>
							{['popularity', 'lowPriceFirst', 'highPriceFirst'].map((item) => (
								<Button
									key={item}
									fullWidth
									onClick={() => {
										const newQuery = filter.define('sort', [item])
										filter.updateURL(newQuery)

										setIsOpenSort(false)
									}}
								>
									{item}
								</Button>
							))}
						</Paper>
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
