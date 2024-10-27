import Chip from '@/components/buttons/Chip'
import ArrowForward from '@mui/icons-material/ArrowForward'

import { Box } from '@mui/material'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'

export default function GridInfRow({ children }: React.PropsWithChildren) {
	const box = useRef<HTMLDivElement>(null)
	const [isHiddenChip, setIsHiddenChip] = useState(true)

	return (
		<div style={{ position: 'relative' }}>
			<div style={{ overflowX: 'scroll' }} ref={box}>
				<Box sx={{ display: 'flex', width: 'fit-content' }} ref={box}>
					{children}
				</Box>

				<Box
					sx={{
						position: 'absolute',
						top: '40%',
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
					}}
				>
					<Chip
						style={{ backgroundColor: 'white' }}
						onClick={() => {
							if (box.current) {
								box.current.scrollBy({ left: -300, behavior: 'smooth' })
								setIsHiddenChip(box.current.scrollLeft < 1)
							}
						}}
						className={classNames({ hidden: isHiddenChip })}
					>
						<ArrowForward style={{ rotate: '180deg' }} />
					</Chip>
					<Chip
						style={{ backgroundColor: 'white' }}
						onClick={() => {
							if (box.current) {
								box.current.scrollBy({ left: 300, behavior: 'smooth' })

								setIsHiddenChip(false)
							}
						}}
					>
						<ArrowForward />
					</Chip>
				</Box>
			</div>
		</div>
	)
}
