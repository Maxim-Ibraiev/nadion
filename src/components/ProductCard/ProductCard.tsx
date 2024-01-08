import { useReduceSelectors } from '@/hooks'
import { IProduct } from '@/interfaces'
import Image from '@/lib/next/Image'
import routes from '@/routes'
import Link from 'next/link'
import s from './ProductCard.module.scss'

interface Props {
	width: number
	height: number
	product: IProduct
	getLinkForProdutc?: (id: string) => string
}

export default function ProductCard({ width, height, product, getLinkForProdutc = undefined }: Props) {
	const { getProductsByModel } = useReduceSelectors()
	const allModels = getProductsByModel(product.getModel())

	return (
		<Link href={getLinkForProdutc ? getLinkForProdutc(product.getId()) : `${routes.product}/${product.getId()}`} className={s.wrapper}>
			<div className={s.image} style={{ width, height }}>
				<Image
					fill
					sizes="(max-width: 765px) 364px,
					         (max-width: 999px) 313px,
					         282px"
					placeholder="blur"
					blurDataURL={product.getMainImageSrc()}
					src={product.getMainImageSrc()}
					alt={product.getTitle()}
				/>
			</div>
			<div className={s.productDetails}>
				<b className={s.price}>{`${product.getPrice()} грн`}</b>
				<span className={s.title}>{product.getTitle()}</span>
				{product.getAllSizeOptions() && (
					<span className={s.sizes}>
						{product.getAllSizeOptions().reduce((acc, el) => {
							if (!acc) return el

							return `${acc}, ${el}`
						}, '')}
					</span>
				)}
				{allModels.length > 1 && (
					<div className={s.palette}>
						{allModels.map((models) => (
							<div className={s.colorBox} key={models.getId()}>
								{models.getColor().map((color) => (
									<div className={s.colorItem} key={color} style={{ backgroundColor: color }} />
								))}
							</div>
						))}
					</div>
				)}
			</div>
		</Link>
	)
}
