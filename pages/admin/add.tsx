import serverApi from '@/api/serverApi'
import httpStatusCodes from '@/api/src/httpStatusCodes'
import Validation from '@/api/src/routes/middleware/Validation'
import cookieOptions from '@/api/src/serverHelpers/cookieOptions'
import dispatchData from '@/api/src/serverHelpers/dispatchData'
import Layout from '@/components/Layout'
import Button from '@/components/buttons/MainButton'
import Form from '@/components/inputs/Form'
import { categories } from '@/constants'
import { HandlerError } from '@/helpers'
import getOptionsFromProducts, { getOptionFormat } from '@/helpers/getOptionsFromProducts'
import { useProducts } from '@/hooks'
import type { IAdmin, ProductToAdd, Request } from '@/interfaces'
import language from '@/language'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import { Box, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import { getIronSession } from 'iron-session'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api from '../../src/api/api'

const initialProduct: Omit<ProductToAdd, 'images'> = {
	title: '',
	description: '',
	model: '',
	category: '',
	price: 0,
	globalCategory: 'femaleClothes',
	material: [],
	colors: [],
	sizes: [],
}

const Input = Form.Input<typeof initialProduct>
const CreatableInput = Form.CreatableInput<typeof initialProduct>

export default function AddPage() {
	const router = useRouter()
	const { products } = useProducts()
	const allOptions = getOptionsFromProducts(products)
	const theme = useTheme()
	const [buttonStatus, setButtonStatus] = useState<Request>()
	const [logoutStatus, setLogoutStatus] = useState<Request>()
	const [fileList, setFileList] = useState<File[]>([])
	const formik = useFormik<typeof initialProduct>({
		initialValues: initialProduct,

		onSubmit: async (values) => {
			const { error, value } = Validation.productToAddWithoutImages.validate(values, { abortEarly: false })

			if (error) {
				error.details.forEach((errorItem) => {
					formik.setFieldError(String(errorItem.path), errorItem.message)
				})
				setButtonStatus('Error')

				return
			}

			try {
				setButtonStatus('Request')

				const productResponse = await api.admin.addProduct(value, fileList, { color: value.colors, title: value.title })

				if (productResponse.status === httpStatusCodes.OK) setButtonStatus('Success')
				else setButtonStatus('Error')
			} catch (e) {
				setButtonStatus('Error')
				HandlerError.addAction('HandlerError at onSubmit form')
			}
		},
	})

	const handleLogout = () => {
		setLogoutStatus('Request')
		api.admin
			.logout()
			.then(() => {
				setLogoutStatus('Success')
				router.push(routes.admin.login)
			})
			.catch(() => setLogoutStatus('Error'))
	}

	useEffect(() => {
		if (buttonStatus) setButtonStatus(null)
	}, [formik.values])

	return (
		<Layout>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component="form" onSubmit={formik.handleSubmit}>
				<Typography component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h3">Add product</Typography>
					<Button status={logoutStatus} isSecondary onClick={handleLogout}>
						{language.logout}
					</Button>
				</Typography>
				<Form.FilesGrid onChange={setFileList} />

				{formik.errors.globalCategory && <Typography color="error">{formik.errors.globalCategory}</Typography>}
				<Form.Select formik={formik} name="globalCategory" options={getOptionFormat(categories)} sx={{ minWidth: '300px' }} />
				{formik.errors.price && <Typography color="error">{formik.errors.price}</Typography>}
				<Input formik={formik} name="price" type="number" sx={{ width: '300px' }} />
				{formik.errors.title && <Typography color="error">{formik.errors.title}</Typography>}
				<Input formik={formik} name="title" />
				{formik.errors.description && <Typography color="error">{formik.errors.description}</Typography>}
				<Input formik={formik} name="description" />
				{formik.errors.model && <Typography color="error">{formik.errors.model}</Typography>}
				<Input formik={formik} name="model" />
				{formik.errors.category && <Typography color="error">{formik.errors.category}</Typography>}
				<CreatableInput formik={formik} name="category" options={allOptions.category} />
				{formik.errors.material && <Typography color="error">{formik.errors.material}</Typography>}
				<CreatableInput formik={formik} name="material" options={allOptions.material} isMultiple />
				{formik.errors.sizes && <Typography color="error">{formik.errors.sizes}</Typography>}
				<CreatableInput formik={formik} name="sizes" options={allOptions.size} isMultiple />
				<Typography variant="body2">
					{language.useHexFormat}{' '}
					<Link
						style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}
						target="_blank"
						href="https://www.w3schools.com/colors/colors_picker.asp"
					>
						{language.colorPick}
					</Link>
				</Typography>
				{formik.errors.colors && <Typography color="error">{formik.errors.colors}</Typography>}
				<CreatableInput formik={formik} name="colors" options={allOptions.color} isMultiple />

				<Button status={buttonStatus} isSubmit>
					{language.save}
				</Button>
			</Box>
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async ({ req, res }) => {
	const session = await getIronSession<IAdmin>(req, res, cookieOptions)

	if (!session.auth) {
		return {
			redirect: { destination: routes.admin.login, permanent: true },
		}
	}

	const products = await serverApi.getProducts()

	dispatchData(dispatch, { products })

	return {
		props: {},
	}
})
