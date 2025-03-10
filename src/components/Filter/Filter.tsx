import categories from '@/constants/categories'
import language from '@/language'
import Link from '@/lib/next/Link'
import routes from '@/routes'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Paper, Slider, Stack } from '@mui/material'
import { useState } from 'react'
import FilterAccordion from './FilterAccordion'

function valuetext(v: number) {
	return `${v} ${language.UAH}`
}

export default function Filter() {
	const [value, setValue] = useState<[number, number]>([20, 3000])
	const colors = ['red', 'blue', 'black', 'beige', 'brown']
	const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
	const dressType = ['без рукавів', 'Короткий рукав', 'Довгі рукави', 'Довгий  довжина до коліна', 'Короткі']

	const handleChange = (_: Event, newValue: number | number[]) => {
		setValue(newValue as [number, number])
	}

	return (
		<Box component="aside">
			<Paper sx={{ display: 'grid', gap: '24px', padding: { xs: '15px 10px', sm: '30px 40px' } }}>
				<Stack>
					{categories.map((category) => (
						<Link key={category} href={routes[category]}>
							<Button fullWidth component="span" endIcon={<ArrowForwardIcon />} size="small">
								{language[category]}
							</Button>
						</Link>
					))}
				</Stack>
			</Paper>

			<FilterAccordion summary={language.price}>
				<Slider
					getAriaLabel={() => 'Price range'}
					value={value}
					onChange={handleChange}
					valueLabelDisplay="auto"
					min={0}
					max={3000}
					getAriaValueText={valuetext}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
					<Chip label={`${value[0]} ${language.UAH}`} />
					<Chip label={`${value[1]} ${language.UAH}`} />
				</Box>
			</FilterAccordion>

			<FilterAccordion summary={language.color}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, 28px)',
						gridAutoRows: '28px',
						gap: '15px',
					}}
				>
					{colors.map((color) => (
						<Checkbox
							key={color}
							icon={<CircleIcon htmlColor={color} fontSize="large" />}
							checkedIcon={<CheckCircleIcon htmlColor={color} fontSize="large" />}
						/>
					))}
				</Box>
			</FilterAccordion>

			<FilterAccordion summary={language.sizes}>
				<FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
					{sizes.map((size) => (
						<FormControlLabel key={size} control={<Checkbox />} label={size} />
					))}
				</FormGroup>
			</FilterAccordion>

			<FilterAccordion summary={language.model}>
				<FormGroup>
					{dressType.map((type) => (
						<FormControlLabel key={type} control={<Checkbox />} label={type} />
					))}
				</FormGroup>
			</FilterAccordion>
		</Box>
	)
}
