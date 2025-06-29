import CardList from '@/components/CardList'
import Filter from '@/components/Filter/Filter'
import { useDevice } from '@/hooks'
import useProducts from '@/hooks/useProducts'
import language from '@/language'
import { Box, Button, Modal } from '@mui/material'
import classNames from 'classnames'
import { useState } from 'react'
import ProductSorter from '../ProductSorter'
import s from './Catalog.module.scss'

interface IProps {
	getLinkForProduct?: (id: string) => string
}

export default function Catalog({ getLinkForProduct }: IProps) {
	const { isMobile, isTable } = useDevice()
	const [isOpenFilter, setIsOpenFilter] = useState(false)
	const isUseModal = isMobile || isTable
	const { filteredProducts } = useProducts()

	return (
		<Box className={classNames({ [s.wrapper]: !isUseModal })}>
			{isUseModal ? (
				<>
					<Box className={s.buttonContainer}>
						<Button onClick={() => setIsOpenFilter(true)}>{language.allFilters}</Button>
						<Box>
							<ProductSorter />
						</Box>
					</Box>

					<Modal
						className={s.modal}
						open={isOpenFilter}
						onClose={() => setIsOpenFilter(false)}
						aria-labelledby="modal-for-filter"
						aria-describedby="filter-products"
					>
						<Filter onRequestClose={() => setIsOpenFilter(false)} />
					</Modal>
				</>
			) : (
				<Filter />
			)}
			<Box className={s.catalog}>
				<CardList products={filteredProducts} getLinkForProduct={getLinkForProduct} />
			</Box>
		</Box>
	)
}
