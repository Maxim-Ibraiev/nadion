import { useProducts } from '@/hooks'
import { IProduct } from '@/interfaces/'
import actions from '@/redux/allActions'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import s from './GridOfSizes.module.scss'

interface Props {
	product: IProduct
}

export default function GridOfSizes({ product }: Props) {
	const dispatch = useDispatch()
	const { selectedProducts } = useProducts()
	let selectedSize = selectedProducts.find((el) => el.getId() === product.getId())?.getSelectedSize() || product.getSelectedSize() || ''

	function handleClick(size: string) {
		if (size === selectedSize) {
			dispatch(actions.setSelectedSizeOfProduct([{ id: product.getId(), selectedSize: '' }]))
			selectedSize = ''
		} else {
			selectedSize = size
			dispatch(actions.setSelectedSizeOfProduct([{ id: product.getId(), selectedSize: size }]))
		}
	}

	return (
		<div className={s.sizeWrapper}>
			{product.getAllSizeOptions().map((size) => (
				<button
					type="button"
					onClick={() => handleClick(size)}
					className={cn(s.baseBtn, {
						[s.activeBtn]: size === selectedSize,
						[s.disableBtn]: product.getAvailableSize()[size] === 0,
					})}
					key={size}
				>
					{size}
				</button>
			))}
		</div>
	)
}
