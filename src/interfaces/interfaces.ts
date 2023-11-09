import { IProduct, IProductObject } from "@/helpers/ProductStructure";

export type Category = "femaleClothes" | "maleClothes" | "childrenClothes" | "all";
export type Categories = Category[];

export interface IShoppingBag {
	id: string;
	selectedProducts: IShotSelectedProducts;
}

export type IShotSelectedProducts = {
	selectedSize?: IProductObject["selectedSize"];
	id: string;
}[];

export interface ICallRequest {
	name: string;
	phoneNumber: string;
}

export interface IDataResponse {
	error: Error | null;
	categories?: Categories;
	products?: IProduct;
}

export interface IState {
	main: {
		products: IProductObject[];
		error: IError;
	};
	selectedProducts: IProductObject[];
}

export type IError = {
	data: null | string | unknown;
	message: string;
} | null;

export interface IResponse<T> {
	status: number;
	data: T | null;
	error: IError | null;
}

export type FilterOption = { value: string; label: string };

export type InitialFilter = {
	globalCategory?: string | string[];
	model?: string | string[];
	category?: string | string[];
	size?: string | string[];
	material?: string | string[];
	color?: string | string[];
	sort?: string | string[];
};

export type FilterQuery = {
	[_Property in keyof InitialFilter]: string[];
};

export type Request = "Error" | "Request" | "Success" | undefined | null;

export interface ILoginData {
	login: string;
	password: string;
}

export interface IAdmin {
	name: string;
	auth: boolean;
}

type UnlistedDataForBackEnd = "id" | "createdAt" | "updatedAt" | "__v" | "selectedSize";

export type ProductToAdd = Omit<IProductObject, UnlistedDataForBackEnd | "popularity">;

export type ProductToUpdate = Omit<Partial<IProductObject>, UnlistedDataForBackEnd>;
