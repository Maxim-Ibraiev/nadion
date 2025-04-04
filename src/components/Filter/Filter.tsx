import FilterAccordion from '@/components/Filter/FilterAccordion'
import MainButton from '@/components/buttons/MainButton'
import { categories } from '@/constants'
import { arrayWrapper, toggleArrayValue } from '@/helpers'
import getOptionsFromProducts from '@/helpers/getOptionsFromProducts'
import { useDevice } from '@/hooks'
import useFilter from '@/hooks/useFilter'
import useProducts from '@/hooks/useProducts'
import { Category, InitialFilter } from '@/interfaces'
import language from '@/language'
import Link from '@/lib/next/Link'
import routes from '@/routes'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import { Box, Button, Checkbox, Chip, FormControlLabel, FormGroup, Paper, Slider, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import React, { forwardRef, useState } from 'react'
import ProductSorter from '../ProductSorter'

function valuetext(v: number) {
	return `${v} ${language.UAH}`
}

interface IProps {
	onRequestClose?: () => void
}

const Filter = forwardRef(({ onRequestClose = () => {} }: IProps, ref) => {
	const { categoredProducts } = useProducts()
	const dressType = ['без рукавів', 'Короткий рукав', 'Довгі рукави', 'Довгий  довжина до коліна', 'Короткі']
	const { isDesktop } = useDevice()
	const filter = useFilter()
	const router = useRouter()
	const globalCategory = (arrayWrapper(router.query?.globalCategory)[0] || 'all') as Category
	const filterOptions = getOptionsFromProducts(categoredProducts[globalCategory] || [])
	const [priceRange, setPriceRange] = useState(filter.query.price ? filter.query.price.map((el) => Number(el)) : [20, 3000])
	const [filterState, setFilterState] = useState(filter.query)

	const handleChange = (option: keyof InitialFilter, value: string) => {
		setFilterState((prevState) => ({
			...prevState,
			[option]: toggleArrayValue(arrayWrapper(prevState[option]), value),
		}))
	}
	const handleSubmitFilter = () => filter.updateURL(filterState)

	const handleChangePriceRange = (_: Event, newValue: number | number[]) => {
		setPriceRange(arrayWrapper(newValue))
		setFilterState((prevState) => ({ ...prevState, price: arrayWrapper(newValue).map((el) => el.toString()) }))
	}

	return (
		<Box component="aside">
			<Paper
				sx={{
					display: 'grid',
					gap: '24px',
					padding: { xs: '15px 10px', sm: '30px 40px' },
				}}
			>
				<Box>
					<Box sx={{ display: 'flex', width: 1, height: 60, borderBottom: '1px solid rgba(0, 0, 0, 0.87)' }}>
						{isDesktop ? (
							<ProductSorter />
						) : (
							<Button sx={{ height: 1, flexGrow: 1 }} onClick={onRequestClose} startIcon={<ArrowBackIcon />}>
								{language.hideFilters}
							</Button>
						)}
						<Button
							sx={{ height: 1 }}
							onClick={() => {
								filter.reset()
								setFilterState({})
								onRequestClose()
							}}
							startIcon={<RotateLeftIcon />}
						>
							{language.reset}
						</Button>
					</Box>
				</Box>

				<Stack>
					{categories.map((el) => (
						<Link key={el} href={routes[el]}>
							<Button fullWidth component="span" endIcon={<ArrowForwardIcon />} size="small" onClick={() => handleChange('category', el)}>
								{language[el]}
							</Button>
						</Link>
					))}
				</Stack>
			</Paper>

			<FilterAccordion summary={language.price}>
				<Slider
					getAriaLabel={() => 'Price range'}
					value={priceRange}
					onChange={handleChangePriceRange}
					valueLabelDisplay="auto"
					min={0}
					max={3000}
					getAriaValueText={valuetext}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
					<Chip label={`${priceRange[0]} ${language.UAH}`} />
					<Chip label={`${priceRange[1]} ${language.UAH}`} />
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
					{filterOptions.color.map(({ value }) => (
						<Checkbox
							sx={{
								boxShadow: `0px 0px 10px 7px ${filterState.color?.includes(value) ? 'rgba(0,255,232, 0.5)' : 'rgba(175, 175, 175,  0.5)'}`,
							}}
							key={value}
							name="color"
							value={value}
							checked={filterState.color?.includes(value) || false}
							onChange={() => handleChange('color', value)}
							icon={<CircleIcon htmlColor={value} fontSize="large" />}
							checkedIcon={<CheckCircleIcon htmlColor={value} fontSize="large" />}
						/>
					))}
				</Box>
			</FilterAccordion>

			<FilterAccordion summary={language.sizes}>
				<FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
					{filterOptions.size.map(({ label, value }) => (
						<FormControlLabel
							name="size"
							key={value}
							checked={filterState.size?.includes(value) || false}
							control={<Checkbox />}
							label={label}
							value={value}
							onChange={() => handleChange('size', value)}
						/>
					))}
				</FormGroup>
			</FilterAccordion>

			<FilterAccordion summary={language.model}>
				<FormGroup>
					{dressType.map((type) => (
						<FormControlLabel
							checked={filterState.model?.includes(type) || false}
							key={type}
							control={<Checkbox />}
							label={type}
							onChange={() => handleChange('model', type)}
						/>
					))}
				</FormGroup>
			</FilterAccordion>
			<MainButton
				onClick={() => {
					handleSubmitFilter()
					onRequestClose()
				}}
			>
				submit
			</MainButton>
		</Box>
	)
})

Filter.displayName = 'Filter'

export default Filter
