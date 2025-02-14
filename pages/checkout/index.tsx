import MainButton from '@/components/buttons/MainButton'
import NovaPost from '@/components/icons/NovaPost'
import UkrPost from '@/components/icons/UkrPost'
import Form from '@/components/inputs/Form'
import Layout from '@/components/Layout'
import ShoppingBagFooter from '@/components/shoppingCollection/ShoppingBagFooter'
import ShoppingBagItem from '@/components/shoppingCollection/ShoppingBagItem'
import ToggleList from '@/components/ToggleList'
import PRODUCTS from '@/constants/PRODUCTS'
import { dispatchData } from '@/helpers'
import useSelectedProducts from '@/hooks/useSelectedProducts'
import language from '@/language'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import { Box, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './CheckoutPage.module.scss'

const validPostformikKeys = ['city', 'novaPostNumber', 'ukrPostNumber', 'phoneNumber', 'name'] as const

type validPostformKeysType = (typeof validPostformikKeys)[number]
type NovaPostStateType = Record<validPostformKeysType, string>

const initianallformikState: NovaPostStateType = {
	city: '',
	novaPostNumber: '',
	ukrPostNumber: '',
	name: '',
	phoneNumber: '',
}

export default function Checkout() {
	const router = useRouter()
	const isDesktop = true
	const [selectedProducts, setSelectedProducts] = useSelectedProducts()
	const [delivaryIndex, setDelivaryIndex] = useState(0)
	const [postIndex, setPostIndex] = useState(0)
	const DELIVARY_POST_INDEX = 0
	const DELIVARY_PICK_UP_INDEX = 1
	const NOVA_POST_INDEX = 0
	const UKR_POST_INDEX = 1
	const formChoise = {
		post: '' as 'NovaPost' | 'ukrPost',
		isPickUp: DELIVARY_PICK_UP_INDEX === delivaryIndex,
		isPostDelivary: DELIVARY_POST_INDEX === delivaryIndex,
		isNovaPost: NOVA_POST_INDEX === postIndex && DELIVARY_POST_INDEX === delivaryIndex,
		isUkrPost: UKR_POST_INDEX === postIndex && DELIVARY_POST_INDEX === delivaryIndex,
	}

	const formik = useFormik({
		initialValues: initianallformikState,
		onSubmit: (e) => {
			if (formChoise.isNovaPost) formik.setFieldValue('ukrPostNumber', '')
			if (formChoise.isUkrPost) formik.setFieldValue('novaPostNumber', '')

			alert(JSON.stringify(formik.values, null, 2))
		},
	})

	return (
		<Layout>
			<div className={s.wrapper}>
				<div className={s.productsContainer}>
					{selectedProducts.length > 0 ? (
						<>
							<ToggleList title={language.productsInBag} isDefaultOpen={isDesktop}>
								<ul className={s.productList}>
									{selectedProducts.map((product) => (
										<li key={product.getId()}>
											<ShoppingBagItem product={product} handleDelete={() => setSelectedProducts.delete(product.getId())} />
										</li>
									))}
								</ul>
							</ToggleList>
							<ShoppingBagFooter className={s.totalSum} />
						</>
					) : (
						<>
							<p style={{ textAlign: 'center' }}>{language.emptyBag}</p>
							<MainButton className={s.close} onClick={() => router.push(routes.home)}>
								{language.toHomePage}
							</MainButton>
						</>
					)}
				</div>

				<Box sx={{ mx: 2, my: 4, borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={delivaryIndex} onChange={(e, v) => setDelivaryIndex(v)} className={s.line}>
						<Tab sx={{ mx: 'auto' }} label={language.delivary} />
						<Tab sx={{ mx: 'auto' }} label={language.pickup} />
					</Tabs>

					{formChoise.isPostDelivary && (
						<Box sx={{ my: 4 }}>
							<Tabs sx={{ my: 4 }} value={postIndex} onChange={(e, v) => setPostIndex(v)}>
								<Tab sx={{ mx: 'auto' }} icon={<NovaPost />} />
								<Tab sx={{ mx: 'auto' }} icon={<UkrPost />} />
							</Tabs>
						</Box>
					)}

					{formChoise.isPickUp && (
						<Box sx={{ my: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 250px' } }}>
							<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
								<div>
									<p>{language.city}</p>
									<p>{language.adress}</p>
									<p>{language.phoneNumber}</p>
									<p>{language.shopName}</p>
								</div>
								<div>
									<p>{language.cityOfCompany}</p>
									<p>{language.adressOfCompany}</p>
									<p>+380 97 00 00 000</p>
									<p>Nadion</p>
								</div>
							</Box>
							<Link
								target="_blank"
								href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%A1%D0%B5%D1%80%D0%B0%D1%84%D0%B8%D0%BC%D0%BE%D0%B2%D0%B8%D1%87%D0%B0,+93,+%D0%9A%D1%80%D0%B8%D0%B2%D0%BE%D0%B9+%D0%A0%D0%BE%D0%B3,+%D0%94%D0%BD%D0%B5%D0%BF%D1%80%D0%BE%D0%BF%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0,+50000/@47.9127938,33.4557635,17.54z/data=!4m15!1m8!3m7!1s0x40dadfe03154ab7b:0xb0fa3a177d6b186e!2z0JrRgNC40LLQvtC5INCg0L7Qsywg0JTQvdC10L_RgNC-0L_QtdGC0YDQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0LjQvdCwLCA1MDAwMA!3b1!8m2!3d47.910483!4d33.391783!16zL20vMDJ4ejRy!3m5!1s0x40db210060c4e50f:0x8741ac3729bc0936!8m2!3d47.9131961!4d33.4566665!16s%2Fg%2F11c4rp2zj2?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
							>
								<Box sx={{ width: '250px', height: '250px', background: 'gray' }} />
							</Link>
						</Box>
					)}

					{formChoise.isPostDelivary && (
						<>
							<Box
								component="form"
								onSubmit={formik.handleSubmit}
								style={{ display: 'grid', gridTemplateColumns: '40% 1fr', gap: '20px', marginBottom: '30px' }}
							>
								<Typography alignContent="center">{language.city}</Typography>
								<Form.Select formik={formik} name="city" required>
									{['Odessa', 'Kryvyi Rig'].map((el) => (
										<MenuItem key={el} value={el}>
											{el}
										</MenuItem>
									))}
								</Form.Select>

								<Typography alignContent="center">Отделения почты</Typography>
								{formChoise.isNovaPost && (
									<Form.Select formik={formik} name="novaPostNumber" required>
										{['#1', '#10'].map((el) => (
											<MenuItem key={el} value={el}>
												{el}
											</MenuItem>
										))}
									</Form.Select>
								)}
								{formChoise.isUkrPost && (
									<Form.Select formik={formik} name="ukrPostNumber" required>
										{['5 UkrPost', '13 UkrPost'].map((el) => (
											<MenuItem key={el} value={el}>
												{el}
											</MenuItem>
										))}
									</Form.Select>
								)}

								<Typography alignContent="center">{language.firstName}</Typography>
								<Form.Input formik={formik} name="name" multiline maxRows={4} required />

								<Typography alignContent="center">{language.phoneNumber}</Typography>
								<Form.Input formik={formik} name="phoneNumber" multiline maxRows={4} required />
							</Box>
							<Box sx={{ my: 2 }}>
								<MainButton isSubmit> onSubmit</MainButton>
							</Box>
						</>
					)}
				</Box>
			</div>
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
	const data = {
		products: { data: PRODUCTS, error: null, status: 200 },
		shoppingBag: { data: { id: '0000', selectedProducts: [] }, error: null, status: 200 },
	}

	dispatchData(store.dispatch, data)

	return {
		props: {},
	}
})
