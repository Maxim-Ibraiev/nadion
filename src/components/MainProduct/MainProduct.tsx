import GridOfSizes from '@/components/gridTemplates/GridOfSizes'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SHOPPING_ID, UAH } from '../../constants'
import language from '../../language'
import routes from '../../routes'
import Gallery from '../Gallery'
import NotFoundProduct from '../NotFoundProduct'
import MainButton from '../buttons/MainButton'
import { BagIcon } from '../icons'
import ShoppingBagModal from '../shoppingCollection/shoppingBagModal'
import s from './MainProduct.module.scss'

export default function MainProduct() {
	const router = useRouter()
	const idProduct = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id || ''
	const { getProductById, getProductsByModel, selectedProducts, setSelectedProducts } = useProducts()
	const product = getProductById(idProduct)
	const allModels = getProductsByModel(product?.getModel() || '')
	const [isProductSelected, setIsProductSelected] = useState(Boolean(selectedProducts.find(({ getId }) => getId() === product?.getId())))
	const [isLoading, setIsLoading] = useState(false)
	const [shoppingId, setShoppingId] = useState('')
	const [isOpenShoppingBag, setIsOpenShoppingBag] = useState(false)

	const handleSelectProduct = () => {
		if (product) {
			const isNeedToAdd = !selectedProducts.some(({ getId }) => getId() === product.getId())

			if (isNeedToAdd) {
				setSelectedProducts('add', product)
				setIsProductSelected(true)
				setIsOpenShoppingBag(true)
			}
		}
	}

	useEffect(() => {
		setIsProductSelected(!!product && selectedProducts.some(({ getId }) => getId() === product.getId()))
		if (!shoppingId) setShoppingId(localStorage.getItem(SHOPPING_ID) || '')
	}, [selectedProducts, idProduct])

	return product ? (
		<section className={s.container}>
			<div className={s.galleryWrapper}>
				<Gallery items={product.getImages()} />
			</div>
			<div className={s.infoContainer}>
				<div className={s.infoSection}>
					<Typography component="h1" className={s.title}>
						{product.getTitle()}
					</Typography>
					<span className={s.price}>
						{product.getPrice()} <span className={s.priceValuta}>{UAH}</span>
					</span>
					<b className={s.title}>{language.size}</b>
					<GridOfSizes product={product} />
					{isProductSelected ? (
						<Link className={s.buylink} href={routes.getCheckout(shoppingId)}>
							<MainButton className={cn(s.buyBtn, s.productSelected)} onClick={() => setIsLoading(true)} isLoading={isLoading}>
								{language.orderProduct}
							</MainButton>
						</Link>
					) : (
						<MainButton className={s.buyBtn} onClick={handleSelectProduct}>
							<BagIcon height="24px" />
							<span>{language.toCart}</span>
						</MainButton>
					)}
				</div>
				<div className={s.infoSection}>
					{allModels.length > 1 && (
						<>
							<b className={s.title}>{language.color}</b>
							<div className={s.color}>
								{allModels.map((model) => (
									<Link key={model.getId()} href={`${routes.product}/${model.getId()}`} className={s.colorImg}>
										<Image src={model.getMainImageSrc()} key={model.getColor().toString()} width={70} height={90} alt={model.getTitle()} />
									</Link>
								))}
							</div>
						</>
					)}
				</div>
			</div>
			<ShoppingBagModal isOpen={isOpenShoppingBag} onClose={() => setIsOpenShoppingBag(false)} />
		</section>
	) : (
		<NotFoundProduct />
	)
}
