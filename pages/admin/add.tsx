import serverApi from '@/api/serverApi'
import dispatchData from '@/api/src/serverHelpers/dispatchData'
import Layout from '@/components/Layout'
import Button from '@/components/buttons/MainButton'
import Form from '@/components/inputs/Form'
import { categories } from '@/constants'
import getOptionsFromProducts, { getOptionFormat } from '@/helpers/getOptionsFromProducts'
import { useProducts } from '@/hooks'
import type { IProductObject } from '@/interfaces'
import language from '@/language'
import { wrapper } from '@/redux/store'
import { Box, Typography, useTheme } from '@mui/material'
import { useFormik } from 'formik'
import Link from 'next/link'

const initialProduct: Omit<IProductObject, 'id' | 'popularity'> = {
	images: [],
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
	const { products } = useProducts()
	const allOptions = getOptionsFromProducts(products)
	const theme = useTheme()
	const formik = useFormik<typeof initialProduct>({
		initialValues: initialProduct,
		onSubmit: () => {
			console.log('submit')
		},
	})

	return (
		<Layout>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component="form" onSubmit={formik.handleSubmit}>
				<Typography variant="h3">Add product</Typography>
				<Form.FilesGrid
					onChange={(e) => {
						console.log(e)
					}}
				/>

				<Form.Select formik={formik} name="globalCategory" options={getOptionFormat(categories)} sx={{ minWidth: '300px' }} />
				<Input formik={formik} name="price" type="number" sx={{ width: '300px' }} />
				<Input formik={formik} name="title" />
				<Input formik={formik} name="description" />
				<Input formik={formik} name="model" />
				<CreatableInput formik={formik} name="category" options={allOptions.category} />
				<CreatableInput formik={formik} name="material" options={allOptions.material} isMultiple />
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
				<CreatableInput formik={formik} name="colors" options={allOptions.color} isMultiple />

				<Button>{language.save}</Button>
				<Typography sx={{ display: 'block' }}>{JSON.stringify(formik.values, null, 2)}</Typography>
			</Box>
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async () => {
	const products = await serverApi.getProducts()

	dispatchData(dispatch, { products })

	return {
		props: {},
	}
})
