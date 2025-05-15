'use client'

import MenuMob from '@/components/MenuMob'
import Button from '@/components/buttons/HederBtn'
import language from '@/language'
import { Modal } from '@mui/material'
import { useState } from 'react'

export default function NavMenu() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<div>
				<Button
					ariaLabel={language.menu}
					src="/icons/menu.svg"
					onClick={() => {
						setIsOpen(true)
					}}
				/>
			</div>

			<Modal open={isOpen} onClose={() => setIsOpen(false)} onClick={() => setIsOpen(false)}>
				<MenuMob />
			</Modal>
		</div>
	)
}
