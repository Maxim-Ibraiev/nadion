import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import reducer from './rootReducer'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['selectedProducts'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({ reducer: persistedReducer, devTools: true, middleware: [] })
export const persistor = persistStore(store)

export const wrapper = createWrapper(() => store)
