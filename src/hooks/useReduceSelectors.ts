import * as selectors from "@/redux/selectors";
import { useSelector } from "react-redux";
import { IProduct, IState } from "../interfaces";

export default function useReduceSelectors() {
	const products = useSelector(selectors.getProducts);
	const selectedProducts = useSelector(selectors.getSelectedProducts);
	const error = useSelector(selectors.getError);

	const useProductById = (id: string) => useSelector<IState, IProduct | undefined>((s) => selectors.getProductById(s, id));
	const useProductsByModel = (model: string) => useSelector<IState, IProduct[]>((s) => selectors.getProductsByModel(s, model));

	return {
		products,
		selectedProducts,
		error,
		getProductById: useProductById,
		getProductsByModel: useProductsByModel,
	};
}
