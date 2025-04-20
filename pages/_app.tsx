import { persistor, wrapper } from '@/redux/store'
import { createTheme, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './global.css'

function MyApp({ Component, ...rest }: AppProps) {
	const { store, props } = wrapper.useWrappedStore(rest)

	const theme = createTheme({
		cssVariables: true,
		palette: {
			mode: 'light',
			primary: {
				main: '#6458b7',
			},
			secondary: {
				main: '#088e7d',
			},
			error: {
				main: '#c13c1b',
			},
			info: {
				main: '#2ca9fb',
			},
			warning: {
				main: '#f58427',
			},
			success: {
				main: '#16671b',
			},
			background: {
				default: '#eeeeee',
			},
		},
		components: {
			MuiModal: {
				defaultProps: {
					disablePortal: true,
					disableEnforceFocus: true,
					disableAutoFocus: true,
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						boxShadow: '0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
					},
				},
			},
		},
	})

	return (
		<div>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<ThemeProvider theme={theme}>
						<Component {...props.pageProps} />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		</div>
	)
}

export default MyApp
