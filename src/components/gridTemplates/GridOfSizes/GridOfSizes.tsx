import { IProduct } from '@/interfaces/'
import actions from '@/redux/allActions'
import cn from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useSelectedProducts } from '@/hooks'
import s from './GridOfSizes.module.scss'

interface Props {
	product: IProduct
}

export default function GridOfSizes({ product }: Props) {
	const dispatch = useDispatch()
	const [selectedProducts] = useSelectedProducts()
	const [selectedSize, setSelectedSize] = useState(selectedProducts.find((el) => el.getId() === product.getId())?.getSelectedSize() || '')

	function handleClick(size: string) {
		if (size === product.getSelectedSize()) {
			dispatch(actions.setSelectedSizeOfProduct([{ id: product.getId(), selectedSize: '' }]))
			setSelectedSize('')
		} else {
			setSelectedSize(size)
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
