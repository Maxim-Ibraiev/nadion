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
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { forwardRef, useState } from 'react'
import ProductSorter from '../ProductSorter'
import s from './Filter.module.scss'

function valuetext(v: number) {
	return `${v} ${language.UAH}`
}

interface IProps {
	onRequestClose?: () => void
}

const Filter = forwardRef(({ onRequestClose = () => {} }: IProps, ref) => {
	const { categoredProducts } = useProducts()
	const brands = ['Adidas', 'Puma', 'Phillip Plein', 'Kenzo', 'Versace']
	const { isDesktop } = useDevice()
	const filter = useFilter()
	const router = useRouter()
	const globalCategory = (arrayWrapper(router.query?.globalCategory)[0] || 'all') as Category
	const filterOptions = getOptionsFromProducts(categoredProducts[globalCategory] || [])
	const [priceRange, setPriceRange] = useState(filter.query.price ? filter.query.price.map((el) => Number(el)) : [20, 3000])

	const handleChange = (option: keyof InitialFilter, value: string) => {
		filter.define(option, toggleArrayValue(arrayWrapper(filter.query[option]), value))
	}

	const handleSubmitFilter = () => {
		filter.updateURL(filter.query)
	}

	const handleChangePriceRange = (_: Event, newValue: number | number[]) => {
		setPriceRange(arrayWrapper(newValue))
		filter.define(
			'price',
			arrayWrapper(newValue).map((el) => el.toString())
		)
	}

	const handleReset = () => {
		filter.reset()
		onRequestClose()
	}

	return (
		<Box component="aside">
			<Paper className={s.header}>
				<Box>
					<Box className={s.headerButtons}>
						{isDesktop ? (
							<ProductSorter />
						) : (
							<Button className={s.headerFilter} onClick={onRequestClose} startIcon={<ArrowBackIcon />}>
								{language.hideFilters}
							</Button>
						)}
						<Button onClick={handleReset} startIcon={<RotateLeftIcon />}>
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
				<Box className={s.spaceAround}>
					<Chip label={`${priceRange[0]} ${language.UAH}`} />
					<Chip label={`${priceRange[1]} ${language.UAH}`} />
				</Box>
			</FilterAccordion>

			<FilterAccordion summary={language.color}>
				<Box className={s.colorWrapper}>
					{filterOptions.color.map(({ value }) => (
						<Checkbox
							sx={{
								boxShadow: `0px 0px 10px 7px ${filter.query.color?.includes(value) ? 'rgba(0,255,232, 0.5)' : 'rgba(175, 175, 175,  0.5)'}`,
							}}
							key={value}
							name="color"
							value={value}
							checked={filter.query.color?.includes(value) || false}
							onChange={() => handleChange('color', value)}
							icon={<CircleIcon htmlColor={value} fontSize="large" />}
							checkedIcon={<CheckCircleIcon htmlColor={value} fontSize="large" />}
						/>
					))}
				</Box>
			</FilterAccordion>

			<FilterAccordion summary={language.sizes}>
				<FormGroup className={classNames(s.sizes, s.grid)}>
					{filterOptions.size.map(({ label, value }) => (
						<FormControlLabel
							name="size"
							key={value}
							checked={filter.query.size?.includes(value) || false}
							control={<Checkbox />}
							label={label}
							value={value}
							onChange={() => handleChange('size', value)}
						/>
					))}
				</FormGroup>
			</FilterAccordion>

			<FilterAccordion summary={language.brand}>
				<FormGroup>
					{brands.map((type) => (
						<FormControlLabel
							checked={filter.query.brand?.includes(type) || false}
							key={type}
							control={<Checkbox />}
							label={type}
							onChange={() => handleChange('brand', type)}
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
