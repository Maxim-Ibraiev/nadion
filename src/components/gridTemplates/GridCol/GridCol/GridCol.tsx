import { Box } from '@mui/material'

export default function GridCol({ children }: React.PropsWithChildren) {
	return (
		<Box
			sx={{
				display: 'grid',
				gap: '20px',
				gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr ' },

				'& > *': {
					height: {
						xs: 300,
						sm: 440,
					},
				},
				'&>*:nth-of-type(6n-5)': {
					gridColumn: { xs: '1/3', sm: '1/3' },
				},
				'&>*:nth-of-type(6n)': {
					gridColumn: { xs: '1/3', sm: '3/5' },
				},
			}}
		>
			{children}
		</Box>
	)
}
