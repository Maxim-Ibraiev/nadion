import cn from "classnames";
import React, { useEffect } from "react";
import ReactModal, { Props } from "react-modal";
import s from "./Modal.module.scss";

interface IProps {
	className?: string;
	overlayClassName?: string;
}

export default function Modal({ children, className = "", overlayClassName = "", isOpen, ...props }: Props & IProps) {
	useEffect(() => {
		ReactModal.setAppElement("#reactModal");
	}, []);

	return (
		<ReactModal className={cn(s.center, s.content, className)} overlayClassName={cn(s.layout, overlayClassName)} isOpen={isOpen} {...props}>
			{children}
		</ReactModal>
	);
}
