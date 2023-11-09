import { persistor, wrapper } from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./global.css";

function MyApp({ Component, ...rest }: AppProps) {
	const { store, props } = wrapper.useWrappedStore(rest);

	return (
		<div>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<div id="reactModal">
						<Component {...props.pageProps} />
					</div>
				</PersistGate>
			</Provider>
		</div>
	);
}

export default MyApp;
