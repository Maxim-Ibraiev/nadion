import Chip from '@/components/buttons/Chip'
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
								box.current.scrollLeft -= 300
								setIsHiddenChip(box.current.scrollLeft < 100)
							}
						}}
						className={classNames({ hidden: isHiddenChip })}
					>
						{'<'}
					</Chip>
					<Chip
						style={{ backgroundColor: 'white' }}
						onClick={() => {
							if (box.current) {
								box.current.scrollLeft += 300
								setIsHiddenChip(false)
							}
						}}
					>
						{'>'}
					</Chip>
				</Box>
			</div>
		</div>
	)
}
