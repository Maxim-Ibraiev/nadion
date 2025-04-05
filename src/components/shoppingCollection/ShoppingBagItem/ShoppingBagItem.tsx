import useReduceActions from '@/hooks/useReduceActions'
import language from '@/language'
import { FormControl, MenuItem, Select, SelectProps } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from '../../../interfaces'
import routes from '../../../routes'
import Button from '../../buttons/MainButton'
import { CloseIcon } from '../../icons'

import s from './ShoppingBagItem.module.scss'

interface IProps {
	product: IProduct
	handleDelete: () => void
	handleClose?: () => void
}

export default function ShoppingBagItem({ product, handleDelete, handleClose = () => {} }: IProps) {
	const { setSelectedSizeOfProduct } = useReduceActions()

	const handleChangeSize: SelectProps['onChange'] = (event) => {
		const value = String(event.target.value || '')
		const payload = { id: product.getId(), selectedSize: value }

		setSelectedSizeOfProduct([payload])
	}

	return (
		<div className={s.wrapper}>
			<div className={s.image}>
				<Link
					href={`${routes.product}/${product.getId()}`}
					onClick={handleClose}
					className={s.imageLink}
					style={{ width: '80px', height: '110px' }}
				>
					<Image
						src={product.getMainImageSrc()}
						width={80}
						height={110}
						alt={product.getTitle()}
						placeholder="blur"
						blurDataURL={product.getMainImageThumbnail()}
					/>
				</Link>
			</div>
			<div className={s.info}>
				<span>{product.getTitle()}</span>
				<div className={s.size}>
					<span>{language.size}:</span>
					<FormControl variant="standard" hiddenLabel>
						<Select labelId="select-label" id="select" value={product.getSelectedSize()} label="size" onChange={handleChangeSize}>
							{product.getAllSizeOptions().map((el) => (
								<MenuItem value={el} key={el}>
									{el}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</div>
			<Button className={s.close} onClick={handleDelete}>
				<CloseIcon height="10px" />
			</Button>
		</div>
	)
}
