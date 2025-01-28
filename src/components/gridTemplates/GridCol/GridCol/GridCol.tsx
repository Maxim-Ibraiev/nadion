import { Box } from '@mui/material'

export default function GridCol({ children }: React.PropsWithChildren) {
	return (
		<Box
			sx={{
				display: 'grid',
				gap: '20px',
				gridTemplateColumns: { sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr ' },

				'& > *': {
					height: {
						sm: 300,
						md: 440,
					},
				},
				'&>*:nth-of-type(6n-5)': {
					gridColumn: { sm: '1/3', md: '1/3' },
				},
				'&>*:nth-of-type(6n)': {
					gridColumn: { sm: '1/3', md: '3/5' },
				},
			}}
		>
			{children}
		</Box>
	)
}
