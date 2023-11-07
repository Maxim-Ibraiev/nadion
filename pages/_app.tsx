import { persistor, wrapper } from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./global.css";

function MyApp({ Component, pageProps, ...rest }: AppProps) {
	const { store } = wrapper.useWrappedStore(rest);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<div id="reactModal">
					<Component {...pageProps} />
				</div>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
