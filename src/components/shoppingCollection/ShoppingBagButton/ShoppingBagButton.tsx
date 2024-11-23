'use client'

import Modal from '@/components/Modal'
import Button from '@/components/buttons/HederBtn'
import language from '@/language'
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

			<Modal
				isOpen={isOpenShoppingBag}
				className={cn(s.modal, s.shoppingBag)}
				overlayClassName={s.overModal}
				onRequestClose={() => setIsOpenShoppingBag(false)}
			>
				<ShoppingBag handleCloseModal={() => setIsOpenShoppingBag(false)} />
			</Modal>
		</div>
	)
}
