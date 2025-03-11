import ProductCard from '@/components/ProductCard'
import { IProduct } from '../../interfaces'
import NoProduct from '../NoProduct'
import s from './CardList.module.scss'

interface IProps {
	products: IProduct[]
	getLinkForProduct?: (id: string) => string
}

export default function CardList({ products, getLinkForProduct = undefined }: IProps) {


	return products.length > 0 ? (
		<section className={s.cards}>
			{products.map((el) => (
				<ProductCard key={el.getId()}  product={el} getLinkForProduct={getLinkForProduct} />
			))}
		</section>
	) : (
		<NoProduct />
	)
}
