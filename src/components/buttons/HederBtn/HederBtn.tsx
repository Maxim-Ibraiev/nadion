import React from 'react'
import s from './HeaderBtn.module.scss'

interface IProps {
	src: string
	ariaLabel: string
	children?: React.ReactNode
	className?: string
	fill?: string
	onClick: () => void
}

function HederBtn({ src, className = '', fill = '#fff', ariaLabel, children = null, onClick }: IProps) {
	return (
		<button className={`${s.wrapper} ${className}`} type="button" onClick={onClick} aria-label={ariaLabel}>
			{children}
			{src && <span style={{ backgroundImage: `url(${src})`, fill }} className={s.icon} />}
		</button>
	)
}

export default HederBtn
