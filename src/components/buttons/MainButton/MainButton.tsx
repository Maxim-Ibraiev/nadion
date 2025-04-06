import cn from 'classnames'
import React, { MouseEvent } from 'react'
import { Request } from '../../../interfaces'
import { LoadingIcon } from '../../icons'
import s from './MainButton.module.scss'

interface IProps {
	children: React.ReactNode
	isSubmit?: boolean
	status?: Request
	className?: string
	isLoading?: boolean

	// eslint-disable-next-line no-unused-vars
	onClick?: (event: MouseEvent) => void
}
type ButtonType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

function Button({
	children,
	className = '',
	onClick = () => undefined,
	isSubmit = false,
	status = null,
	isLoading = false,
	disabled = false,
	...butonProps
}: IProps & ButtonType) {
	const isShowLoading = isLoading || status === 'Request'

	return (
		<button
			className={cn(className, s.btn, {
				[s.request]: isShowLoading,
				[s.error]: status === 'Error',
				[s.success]: status === 'Success',
				[s.disabled]: disabled,
			})}
			disabled={isShowLoading || status === 'Success' || disabled}
			type={isSubmit ? 'submit' : 'button'}
			onClick={onClick}
			{...butonProps}
		>
			<span className={cn(s.content, { [s.hiddenContent]: isShowLoading })}>{children}</span>
			<LoadingIcon className={cn(s.hiddenIcon, { [s.loadingIcon]: isShowLoading })} />
		</button>
	)
}

export default Button
