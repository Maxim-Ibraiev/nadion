import Button from '@/components/buttons/MainButton'
import { CloseIcon } from '@/components/icons'
import ShoppingBagFooter from '@/components/shoppingCollection/ShoppingBagFooter'
import ShoppingBagItem from '@/components/shoppingCollection/ShoppingBagItem'
import { useProducts } from '@/hooks'
import language from '@/language'
import { useRouter } from 'next/router'
import { useState } from 'react'
import routes from '../../../routes'
import s from './ShoppingBag.module.scss'

interface IProps {
	handleCloseModal: () => void
}

export default function ShoppingBag({ handleCloseModal }: IProps) {
	const router = useRouter()
	const { selectedProducts, setSelectedProducts } = useProducts()
	const [isLoading, setIsLoading] = useState(false)

	const handleOrder = () => {
		if (routes.checkout === router.asPath) handleCloseModal()
		else {
			setIsLoading(true)
			router.push(routes.checkout)
		}
	}

	return (
		<section className={s.wrapper}>
			<div className={s.header}>
				<p className={s.title}>{language.productsInBag}</p>

				<Button onClick={() => handleCloseModal()} className={s.x}>
					<CloseIcon height="20px" />
				</Button>
			</div>

			{selectedProducts.length > 0 ? (
				<>
					<div className={s.container}>
						{selectedProducts.map((product) => (
							<ShoppingBagItem
								key={product.getId()}
								product={product}
								handleDelete={() => setSelectedProducts('delete', product)}
								handleClose={handleCloseModal}
							/>
						))}
					</div>
					<ShoppingBagFooter className={s.footer}>
						<Button className={s.secondaryBottom} onClick={() => handleCloseModal()}>
							{language.continueShopping}
						</Button>
						<Button onClick={handleOrder} isLoading={isLoading}>
							{language.orderProduct}
						</Button>
					</ShoppingBagFooter>
				</>
			) : (
				<>
					<p style={{ textAlign: 'center' }}>{language.emptyBag}</p>
					<Button className={s.close} onClick={() => (handleCloseModal ? handleCloseModal() : router.push(routes.home))}>
						{language.close}
					</Button>
				</>
			)}
		</section>
	)
}
