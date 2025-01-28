import cn from 'classnames'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { ToggleIcon } from '../icons'
import s from './ToggleList.module.scss'

interface IProps {
	title: string
	isDefaultOpen?: boolean
	classList?: string
	classHeader?: string
}

function ToggleList({ title, isDefaultOpen = false, classList = '', classHeader = '', children = null }: PropsWithChildren<IProps>) {
	const [isOpen, setIsOpen] = useState(isDefaultOpen)
	const contentBox = useRef<HTMLDivElement>(null)
	const [contentHight, setContentHight] = useState(620)

	useEffect(() => {
		if (contentBox?.current?.clientHeight && contentHight === 620) setContentHight(contentBox?.current.clientHeight)
	}, [])

	useEffect(() => {
		if (isDefaultOpen) setIsOpen(true)
	}, [isDefaultOpen])

	return (
		<div>
			<button type="button" className={cn(s.header, { [classHeader]: classHeader })} onClick={() => setIsOpen(!isOpen)}>
				<div className={cn(s.toggleIcon, { [s.rotate]: isOpen })}>
					<ToggleIcon />
				</div>
				<span className={s.title}>{title}</span>
			</button>
			<div
				className={cn(s.content, { [s.isOpen]: isOpen, [classList]: classList })}
				style={isOpen ? { maxHeight: `${contentHight}px` } : { maxHeight: 0 }}
				ref={contentBox}
			>
				{children}
			</div>
		</div>
	)
}
export default ToggleList
