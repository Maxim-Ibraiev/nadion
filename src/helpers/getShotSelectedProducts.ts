import { IProduct, IShotSelectedProducts } from "../interfaces";

export default function getShotSelectedProducts(
  products: IProduct[]
): IShotSelectedProducts {
  return products.map((el) => ({
    id: el.getId(),
    selectedSize: el.getSelectedSize(),
  }));
}
