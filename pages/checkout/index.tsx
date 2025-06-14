import serverApi from '@/api/serverApi'
import dispatchData from '@/api/serverHelpers/dispatchData'
import Layout from '@/components/Layout'
import ToggleList from '@/components/ToggleList'
import MainButton from '@/components/buttons/MainButton'
import NovaPost from '@/components/icons/NovaPost'
import UkrPost from '@/components/icons/UkrPost'
import Form from '@/components/inputs/Form'
import ShoppingBagFooter from '@/components/shoppingCollection/ShoppingBagFooter'
import ShoppingBagItem from '@/components/shoppingCollection/ShoppingBagItem'
import { useProducts } from '@/hooks'
import language from '@/language'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
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

				<Box className={s.checkoutContainer}>
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
							<Link target="_blank" href={routes.googleMap}>
								<Box className={s.map} />
							</Link>
						</Box>
					)}

					{formChoise.isPostDelivary && (
						<Box component="form" onSubmit={formik.handleSubmit} className={s.form}>
							<Form.Input formik={formik} name="city" required>
								{['Odessa', 'Kryvyi Rig'].map((el) => (
									<MenuItem key={el} value={el}>
										{el}
									</MenuItem>
								))}
							</Form.Input>
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
							<Form.Input formik={formik} name="name" required />
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

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async () => {
	const res = await serverApi.getProducts()

	dispatchData(dispatch, { products: res })

	return {
		props: {},
	}
})
