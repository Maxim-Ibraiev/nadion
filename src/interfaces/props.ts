import { IProductObject } from "@/interfaces";

export interface IProductsProps {
  products: IProductObject[] | null;
  productsError: {
    data: unknown;
    message: string;
  };
}
export interface ICategoriesProps {
  categories: IProductObject | null;
  categoriesError: {
    data: unknown;
    message: string;
  };
}
