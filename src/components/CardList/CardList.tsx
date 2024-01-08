import ProductCard from '@/components/ProductCard'
import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'
import { getImgSize } from '../../helpers'
import { IProduct } from '../../interfaces'
import NoProduct from '../NoProduct'
import s from './CardList.module.scss'

interface IProps {
	products: IProduct[]
	getLinkForProdutc?: (id: string) => string
}

export default function CardList({ products, getLinkForProdutc = undefined }: IProps) {
	const [imgSize, setImgSize] = useState({ width: 170, height: 220 })

	useEffect(() => {
		const handleResize = throttle(() => setImgSize(getImgSize()), 1000)

		window.addEventListener('resize', handleResize)
		setImgSize(getImgSize())

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return products.length > 0 ? (
		<section className={s.cards}>
			{products.map((el) => (
				<ProductCard key={el.getId()} width={imgSize.width} height={imgSize.height} product={el} getLinkForProdutc={getLinkForProdutc} />
			))}
		</section>
	) : (
		<NoProduct />
	)
}
