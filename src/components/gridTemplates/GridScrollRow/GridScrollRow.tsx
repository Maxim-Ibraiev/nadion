import Chip from '@/components/buttons/Chip'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { Box } from '@mui/material'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import s from './GridScrollRow.module.scss'

export default function GridInfRow({ children }: React.PropsWithChildren) {
	const box = useRef<HTMLDivElement>(null)
	const [isHiddenChip, setIsHiddenChip] = useState(true)

	const handleLeftScroll = (scrollBy: number) => {
		if (box.current) {
			box.current.scrollBy({ left: scrollBy, behavior: 'smooth' })

			setIsHiddenChip(box.current.scrollLeft < 1 && box.current.scrollLeft > scrollBy)
		}
	}

	return (
		<div className={s.wrapper}>
			<div className={s.container} ref={box}>
				<Box className={s.list}>{children}</Box>

				<Box className={s.chipsContainer}>
					<Chip className={classNames(s.chip, { hidden: isHiddenChip })} onClick={() => handleLeftScroll(-300)}>
						<ArrowForward style={{ rotate: '180deg' }} />
					</Chip>
					<Chip className={s.chip} onClick={() => handleLeftScroll(300)}>
						<ArrowForward />
					</Chip>
				</Box>
			</div>
		</div>
	)
}
