import Button from "@/components/buttons/MainButton";
import { CloseIcon } from "@/components/icons";
import ShoppingBagFooter from "@/components/shoppingCollection/ShoppingBagFooter";
import ShoppingBagItem from "@/components/shoppingCollection/ShoppingBagItem";
import { SHOPPING_ID } from "@/constants";
// import { useSelectedProducts } from "@/hooks";
import { IProduct } from "@/interfaces";
import language from "@/language";
import Link from "@/lib/next/Link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import routes from "../../../routes";
import s from "./ShoppingBag.module.scss";

interface IProps {
	handleCloseModal: () => void;
}

export default function ShoppingBag({ handleCloseModal }: IProps) {
	const router = useRouter();
	const [selectedProducts, _] = useState<IProduct[]>([]);
	const [shoppingId, setShoppingId] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// const handleDelete = (product: IProduct) => {
	// 	setSelectedProducts(selectedProducts.filter((el) => el.getId() !== product.getId()));
	// };

	const handleOrder = () => {
		if (routes.getCheckout(shoppingId) === router.asPath) handleCloseModal();
		else setIsLoading(true);
	};

	useEffect(() => {
		const id = localStorage.getItem(SHOPPING_ID);

		if (id) setShoppingId(id);
	}, []);

	return (
		<section className={s.wrapper}>
			<div className={s.header}>
				<p className={s.title}>{language.productsInBag}</p>

				<Button handleClick={() => handleCloseModal()} className={s.x}>
					<CloseIcon height="20px" />
				</Button>
			</div>

			{selectedProducts.length > 0 ? (
				<>
					<div className={s.container}>
						{selectedProducts.map((product) => (
							<ShoppingBagItem
								key={product.getId()}
								product={product}
								handleDelete={() => null}
								// handleDelete={() => handleDelete(product)}
								handleClose={handleCloseModal}
							/>
						))}
					</div>
					<ShoppingBagFooter className={s.footer}>
						<Button className={s.secondaryBottom} handleClick={() => handleCloseModal()}>
							{language.continueShopping}
						</Button>
						<Link href={routes.getCheckout(shoppingId)} style={{ pointerEvents: "none" }} className={s.primaryBottom}>
							<Button handleClick={handleOrder} isLoading={isLoading}>
								{language.orderProduct}
							</Button>
						</Link>
					</ShoppingBagFooter>
				</>
			) : (
				<>
					<p style={{ textAlign: "center" }}>{language.emptyBag}</p>
					<Button className={s.close} handleClick={() => (handleCloseModal ? handleCloseModal() : router.push(routes.home))}>
						{language.close}
					</Button>
				</>
			)}
		</section>
	);
}
