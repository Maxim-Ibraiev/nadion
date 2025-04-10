'use client'

import Button from '@/components/buttons/HederBtn'
import language from '@/language'
import { useState } from 'react'
import ShoppingBagModal from '../shoppingBagModal'

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

			<ShoppingBagModal
				isOpen={isOpenShoppingBag}
				onClose={() => {
					setIsOpenShoppingBag(false)
				}}
			/>
		</div>
	)
}
