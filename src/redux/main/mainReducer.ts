import { combineReducers, createAction, createReducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ProductStructure } from "../../helpers";
import { IError, IProductObject, IShotSelectedProducts } from "../../interfaces";
import { productsError, productsSuccess, selectedProductsSuccess, setSelectedProducts, setSelectedSizeOfProduct } from "./mainActions";

interface IPayload<T> {
	payload: T;
}

export const HYDRATE_PRODUCT = createAction<IProductObject[]>(HYDRATE);
export const HYDRATE_ERROR = createAction<IError>(HYDRATE);

const products = createReducer<IProductObject[]>([], (builder) => {
	builder
		.addCase(HYDRATE_PRODUCT, (_, action) => action.payload)
		.addCase(productsSuccess, (_, action) => action.payload)
		.addCase(setSelectedSizeOfProduct, (state, { payload }) => handleSelectedSizeOfProduct(state, { payload }));
});

const selectedProducts = createReducer<IProductObject[]>([], (builder) => {
	builder
		.addCase(HYDRATE_PRODUCT, (_, { payload }) => payload)
		.addCase(selectedProductsSuccess, (_, { payload }) => payload.map((el) => el.toObject()))
		.addCase(setSelectedProducts, (_, { payload }) => payload.map((el) => el.toObject()))
		.addCase(setSelectedSizeOfProduct, (state, { payload }) => handleSelectedSizeOfProduct(state, { payload }));
});

const error = createReducer<IError>(null, (builder) => {
	builder
		.addCase(HYDRATE_ERROR, (_, { payload }) => payload)
		.addCase(productsSuccess, () => null)
		.addCase(productsError, (_, { payload }) => payload);
});

function handleSelectedSizeOfProduct(productsOfRedux: IProductObject[], { payload }: IPayload<IShotSelectedProducts>) {
	return productsOfRedux.map((prd) => {
		const product = new ProductStructure(prd);
		const selectedSize = payload.find((el) => el.id === product.getId())?.selectedSize;
		return selectedSize && selectedSize.length > 0 ? { ...product.toObject(), selectedSize } : product.toObject();
	});
}

const main = combineReducers({
	products,
	selectedProducts,
	error,
});
export default main;
