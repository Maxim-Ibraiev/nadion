import { Modal, Paper } from '@mui/material'
import ShoppingBag from '../ShoppingBag/ShoppingBag'
import s from './ShoppingBagModal.module.scss'

interface IProps {
	isOpen: boolean
	onClose: () => void
}

export default function ShoppingBagModal({ isOpen, onClose }: IProps) {
	return (
		<Modal open={isOpen} onClose={onClose} className={s.modal}>
			<Paper className={s.shoppingBag}>
				<ShoppingBag handleCloseModal={onClose} />
			</Paper>
		</Modal>
	)
}
