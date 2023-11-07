import { IProduct } from "@/interfaces";
import classNames from "classnames";
import React, { useState } from "react";
import { UAH } from "../../../constants";
// import { useSelectedProducts } from "../../../hooks";
import language from "../../../language";
import s from "./ShoppingBagFooter.module.scss";

interface IProps {
	className?: string;
	children: React.ReactNode;
}

function ShoppingBagFooter({ className = "", children }: IProps) {
	const [selectedProducts] = useState<IProduct[]>([]);

	return (
		<div className={classNames(s.footer, { [className]: className })}>
			<div className={s.totalContainer}>
				<span className={s.totalTitle}>{language.orderResults}</span>
				<div className={s.totalItem}>
					<span>{language.total}</span>
					<span>
						{selectedProducts.reduce((acc, el) => acc + el.getPrice(), 0)} <span className={s.priceValuta}>{UAH}</span>
					</span>
				</div>
			</div>
			{children && <div className={s.footerBottoms}>{children}</div>}
		</div>
	);
}

export default ShoppingBagFooter;
