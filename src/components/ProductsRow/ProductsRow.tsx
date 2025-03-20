import GridScrollRow from '@/components/gridTemplates/GridScrollRow'
import { IProduct } from '@/interfaces'
import ProductCard from '../ProductCard'

interface IProps {
	products: IProduct[]
}

export default function ProductsRow({ products }: IProps) {
	return (
		<GridScrollRow>
			{products.map((product) => (
				<div key={product.getId()} style={{ marginRight: '10px' }}>
					<ProductCard product={product} />
				</div>
			))}
		</GridScrollRow>
	)
}
