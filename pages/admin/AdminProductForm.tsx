import api from '@/api'
import httpStatusCodes from '@/api/httpStatusCodes'
import Validation from '@/api/routes/middleware/Validation'
import Layout from '@/components/Layout'
import Button from '@/components/buttons/MainButton'
import Form from '@/components/inputs/Form'
import { categories } from '@/constants'
import { HandlerError } from '@/helpers'
import getOptionsFromProducts, { getOptionFormat } from '@/helpers/getOptionsFromProducts'
import { useProducts } from '@/hooks'
import type { IProduct, IProductObject, IResponse, ProductToAdd, ProductToUpdate, Request } from '@/interfaces'
import language from '@/language'
import routes from '@/routes'
import { Box, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const emtyInitialProduct: ReturnType<IProduct['toFormObject']> = {
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

const Input = Form.Input<typeof emtyInitialProduct>
const CreatableInput = Form.CreatableInput<typeof emtyInitialProduct>

type IProps =
	| {
			handleAddSumbit: (body: ProductToAdd, fileList: File[]) => Promise<IResponse<IProductObject>>

			handleEditSumbit?: undefined
			product?: undefined
			images?: undefined
	  }
	| {
			handleEditSumbit: (body: ProductToUpdate, fileList: File[]) => Promise<IResponse<IProductObject>>
			product: IProduct
			images: ReturnType<IProduct['getImages']>

			handleAddSumbit?: undefined
	  }

export default function ProductAdminPanel({ handleAddSumbit, handleEditSumbit, product, images = [] }: IProps) {
	const router = useRouter()
	const { products } = useProducts()
	const allOptions = getOptionsFromProducts(products)
	const theme = useTheme()
	const [buttonStatus, setButtonStatus] = useState<Request>()
	const [logoutStatus, setLogoutStatus] = useState<Request>()
	const [fileList, setFileList] = useState<File[]>([])
	const [imageListToDelete, setImageListToDelete] = useState<string[]>([])

	const formik = useFormik<typeof emtyInitialProduct>({
		initialValues: product ? product.toFormObject() : emtyInitialProduct,

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

				const productResponse = product
					? await handleEditSumbit({ ...value, id: product.getId() }, fileList)
					: await handleAddSumbit(value, fileList)

				if (product && imageListToDelete.length) {
					await api.admin.deleteImage(product.getId(), imageListToDelete)
				}

				if (productResponse.status === httpStatusCodes.OK) setButtonStatus('Success')
				else setButtonStatus('Error')
			} catch (e) {
				setButtonStatus('Error')

				HandlerError.addAction('HandlerError at onSubmit form', e)
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

	const handleDeleteImageItem = (index: number) =>
		setImageListToDelete((preImages) => {
			const imageToDelete = images.at(index)

			if (imageToDelete) {
				preImages.push(imageToDelete.original)
			} else HandlerError.addAction('handleDeleteImageItem')

			return preImages
		})

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

				<Form.FilesGrid onChange={setFileList} images={images} onDeleteItem={handleDeleteImageItem} />

				{formik.errors.globalCategory && <Typography color="error">{formik.errors.globalCategory}</Typography>}
				<Form.Select formik={formik} name="globalCategory" options={getOptionFormat(categories)} sx={{ minWidth: '300px' }} />
				{formik.errors.price && <Typography color="error">{formik.errors.price}</Typography>}
				<Input formik={formik} name="price" type="number" sx={{ width: '300px' }} />
				{formik.errors.title && <Typography color="error">{formik.errors.title}</Typography>}
				<Input formik={formik} name="title" />
				{formik.errors.description && <Typography color="error">{formik.errors.description}</Typography>}
				<Input formik={formik} name="description" />
				{formik.errors.model && <Typography color="error">{formik.errors.model}</Typography>}
				<CreatableInput formik={formik} name="model" options={allOptions.model} />
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
				<pre>
					<span style={{ maxWidth: '300px', textOverflow: 'clip' }}>{JSON.stringify({ ...formik.values, images: [] }, null, 2)}</span>
				</pre>
			</Box>
		</Layout>
	)
}
