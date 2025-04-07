import Layout from '@/components/Layout'
import ToggleList from '@/components/ToggleList'
import MainButton from '@/components/buttons/MainButton'
import NovaPost from '@/components/icons/NovaPost'
import UkrPost from '@/components/icons/UkrPost'
import Form from '@/components/inputs/Form'
import ShoppingBagFooter from '@/components/shoppingCollection/ShoppingBagFooter'
import ShoppingBagItem from '@/components/shoppingCollection/ShoppingBagItem'
import PRODUCTS from '@/constants/PRODUCTS'
import { useProducts } from '@/hooks'
import language from '@/language'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import dispatchData from '@api/serverHelpers/dispatchData'
import CheckIcon from '@mui/icons-material/Check'
import { Box, MenuItem, Modal, Paper, Tab, Tabs, Typography } from '@mui/material'
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
	const { selectedProducts, setSelectedProducts } = useProducts()
	const [delivaryIndex, setDelivaryIndex] = useState(0)
	const [postIndex, setPostIndex] = useState(0)
	const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false)
	const [isEmtiBag, setIsEmtiBag] = useState(false)
	const DELIVARY_POST_INDEX = 0
	const DELIVARY_PICK_UP_INDEX = 1
	const NOVA_POST_INDEX = 0
	const UKR_POST_INDEX = 1
	const formChoise = {
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
			if (selectedProducts.length === 0) {
				setIsEmtiBag(true)
				return
			}

			console.log({ formChoise, selectedProducts: selectedProducts.map((el) => el.toObject()) })

			setSelectedProducts('reset')
			setIsOpenSubmitModal(true)
			formik.resetForm()
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
											<ShoppingBagItem product={product} handleDelete={() => setSelectedProducts('delete', product)} />
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

				<Box className={s.checkoutTitle}>
					<Tabs value={delivaryIndex} onChange={(e, v) => setDelivaryIndex(v)} className={s.line}>
						<Tab className={s.center} label={language.delivary} />
						<Tab className={s.center} label={language.pickup} />
					</Tabs>

					{formChoise.isPostDelivary && (
						<Box className={s.postDelivary}>
							<Tabs value={postIndex} onChange={(_, v) => setPostIndex(v)}>
								<Tab className={s.center} icon={<NovaPost />} />
								<Tab className={s.center} icon={<UkrPost />} />
							</Tabs>
						</Box>
					)}

					{formChoise.isPickUp && (
						<Box className={s.pickUpContainer}>
							<Box className={s.adress}>
								<div>
									<Typography>{language.city}</Typography>
									<Typography>{language.adress}</Typography>
									<Typography>{language.phoneNumber}</Typography>
									<Typography>{language.shopName}</Typography>
								</div>
								<div>
									<Typography>{language.cityOfCompany}</Typography>
									<Typography>{language.adressOfCompany}</Typography>
									<Typography>+380 97 00 00 000</Typography>
									<Typography>Nadion</Typography>
								</div>
							</Box>
							<Link
								target="_blank"
								href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%A1%D0%B5%D1%80%D0%B0%D1%84%D0%B8%D0%BC%D0%BE%D0%B2%D0%B8%D1%87%D0%B0,+93,+%D0%9A%D1%80%D0%B8%D0%B2%D0%BE%D0%B9+%D0%A0%D0%BE%D0%B3,+%D0%94%D0%BD%D0%B5%D0%BF%D1%80%D0%BE%D0%BF%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0,+50000/@47.9127938,33.4557635,17.54z/data=!4m15!1m8!3m7!1s0x40dadfe03154ab7b:0xb0fa3a177d6b186e!2z0JrRgNC40LLQvtC5INCg0L7Qsywg0JTQvdC10L_RgNC-0L_QtdGC0YDQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0LjQvdCwLCA1MDAwMA!3b1!8m2!3d47.910483!4d33.391783!16zL20vMDJ4ejRy!3m5!1s0x40db210060c4e50f:0x8741ac3729bc0936!8m2!3d47.9131961!4d33.4566665!16s%2Fg%2F11c4rp2zj2?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
							>
								<Box className={s.map} />
							</Link>
						</Box>
					)}

					{formChoise.isPostDelivary && (
						<Box component="form" onSubmit={formik.handleSubmit} className={s.form}>
							<Typography alignContent="center">{language.city}</Typography>
							<Form.Input formik={formik} name="city" required>
								{['Odessa', 'Kryvyi Rig'].map((el) => (
									<MenuItem key={el} value={el}>
										{el}
									</MenuItem>
								))}
							</Form.Input>

							<Typography alignContent="center">Отделения почты</Typography>
							{formChoise.isNovaPost && (
								<Form.Input formik={formik} name="novaPostNumber" required>
									{['#1', '#10'].map((el) => (
										<MenuItem key={el} value={el}>
											{el}
										</MenuItem>
									))}
								</Form.Input>
							)}
							{formChoise.isUkrPost && (
								<Form.Input formik={formik} name="ukrPostNumber" required>
									{['5 UkrPost', '13 UkrPost'].map((el) => (
										<MenuItem key={el} value={el}>
											{el}
										</MenuItem>
									))}
								</Form.Input>
							)}

							<Typography alignContent="center">{language.firstName}</Typography>
							<Form.Input formik={formik} name="name" required />

							<Typography alignContent="center">{language.phoneNumber}</Typography>
							<Form.Input formik={formik} name="phoneNumber" required />
							<Box className={s.submit}>
								{isEmtiBag && <Typography color="error">{language.emptyBag}</Typography>}
								<MainButton isSubmit disabled={isEmtiBag}>
									{language.confirmOrder}
								</MainButton>
							</Box>
						</Box>
					)}
				</Box>
			</div>

			<Modal open={isOpenSubmitModal} onClose={() => setIsOpenSubmitModal(false)}>
				<Paper className={s.modal}>
					<CheckIcon fontSize="large" className={s.icon} />
					<Box>
						<Typography variant="h4" component="h2" textAlign="center" m={4}>
							{language.thanks}
						</Typography>
						<Typography variant="body1" component="h3" textAlign="center" m={4}>
							{language.waitForACall}
						</Typography>
						<Box className={s.buttonContainer}>
							<MainButton onClick={() => router.push(routes.home)}>{language.toHomePage}</MainButton>
						</Box>
					</Box>
				</Paper>
			</Modal>
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
