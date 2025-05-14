import api from '@/api/api'
import cookieOptions from '@/api/src/serverHelpers/cookieOptions'
import MainButton from '@/components/buttons/MainButton'
import Input from '@/components/inputs/Input'
import Layout from '@/components/Layout'
import type { IAdmin, ILoginData, Request } from '@/interfaces'
import { wrapper } from '@/redux/store'
import routes from '@/routes'
import { Box, Paper, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { getIronSession } from 'iron-session'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Page() {
	const router = useRouter()
	const [loginStatus, setLoginStatus] = useState<Request>()

	const formik = useFormik<ILoginData>({
		initialValues: {
			login: '',
			password: '',
		},

		onSubmit: async (body) => {
			setLoginStatus('Request')

			try {
				const response = await api.admin.login(body)

				if (response.data?.auth) {
					setLoginStatus('Success')
					router.push(routes.admin.add)
				} else setLoginStatus('Error')
			} catch (error) {
				setLoginStatus('Error')
			}
		},
	})

	return (
		<Layout>
			<Paper sx={{ padding: 3, mx: 'auto', maxWidth: '600px' }}>
				<Typography variant="h4" component="h1" mb={3}>
					Authorization
				</Typography>
				<Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
					<Input formik={formik} name="login" />
					<Input formik={formik} name="password" type="password" />

					<MainButton status={loginStatus} isSubmit>
						Submit
					</MainButton>
				</Box>
			</Paper>
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req, res }) => {
	const session = await getIronSession<IAdmin>(req, res, cookieOptions)

	if (session.auth) {
		return {
			redirect: { destination: routes.admin.add, permanent: true },
		}
	}

	return {
		props: {},
	}
})
