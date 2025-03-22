import GridScrollRow from '@/components/gridTemplates/GridScrollRow'
import { IProduct } from '@/interfaces'
import ProductCard from '../ProductCard'

interface IProps {
	products: IProduct[]
	width: number
}

export default function ProductsRow({ products, width }: IProps) {
	console.log(' width:', width)
	return (
		<GridScrollRow>
			{products.map((product) => (
				<div key={product.getId()} style={{ marginRight: '10px', width }}>
					<ProductCard product={product} />
				</div>
			))}
		</GridScrollRow>
	)
}
