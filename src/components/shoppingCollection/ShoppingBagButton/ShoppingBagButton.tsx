'use client'

import Button from '@/components/buttons/HederBtn'
import language from '@/language'
import { Modal, Paper } from '@mui/material'
import cn from 'classnames'
import { useState } from 'react'
import ShoppingBag from '../ShoppingBag/ShoppingBag'
import s from './ShoppingBagButton.module.scss'

export default function ShoppingBagButton() {
	const [isOpenShoppingBag, setIsOpenShoppingBag] = useState(false)

	return (
		<div>
			<div>
				<Button
					ariaLabel={language.menu}
					src={isOpenShoppingBag ? '/icons/close.svg' : '/icons/bag.svg'}
					onClick={() => {
						setIsOpenShoppingBag(true)
					}}
				/>
			</div>

			<Modal open={isOpenShoppingBag} onClose={() => setIsOpenShoppingBag(false)}>
				<Paper className={cn(s.shoppingBag)}>
					<ShoppingBag handleCloseModal={() => setIsOpenShoppingBag(false)} />
				</Paper>
			</Modal>
		</div>
	)
}
