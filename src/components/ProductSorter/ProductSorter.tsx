import getOptionsFromProducts from '@/helpers/getOptionsFromProducts'
import useFilter from '@/hooks/useFilter'
import language from '@/language'
import { Button, Modal, Paper } from '@mui/material'
import { useState } from 'react'

export default function ProductSorter() {
	const [isOpenSort, setIsOpenSort] = useState(false)
	const filter = useFilter()
	const { sort } = getOptionsFromProducts([])

	return (
		<>
			<Button variant="text" onClick={() => setIsOpenSort(true)}>
				{language.sort}
			</Button>

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
					{sort.map(({ label, value }) => (
						<Button
							key={value}
							fullWidth
							onClick={() => {
								const newQuery = filter.define('sort', [value])
								console.log(' value:', value)
								filter.updateURL(newQuery)

								setIsOpenSort(false)
							}}
						>
							{label}
						</Button>
					))}
				</Paper>
			</Modal>
		</>
	)
}
