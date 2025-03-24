import arrayWrapper from './arrayWrapper'
// import { SHOPPING_ID } from '../constants'
import { IProduct, InitialFilter } from '../interfaces'

interface IOptions {
	[key: string]: string[]
}

export default function getFilteredProducts(products: readonly IProduct[], options = {} as IOptions): IProduct[] {
	OptionChecker(options)

	let filteredProducts = [...products]
	filteredProducts = filterForProducts(filteredProducts, options)

	return getSortedProducts(filteredProducts, options.sort)
}

function OptionChecker(options: IOptions) {
	const supportedOptions = [
		'sort',
		'category',
		'color',
		'material',
		'season',
		'size',
		'globalCategory',
		'price',
		// SHOPPING_ID,
	]

	Object.keys(options).forEach((option) => {
		if (!supportedOptions.includes(option)) console.warn(`Option '${option}' do not support for sorting.`)
	})
}

function filterForProducts(products: IProduct[], options: IOptions): IProduct[] {
	return products.filter(
		(product) =>
			isMatchedProduct(product, options) && getPriceMatchedProducts(product, options.price) && isSizeMatchedProduct(product, options.size)
	)
}

type MatchedOption = {
	globalCategory?: string[]
	category?: string[]
	size?: string[]
	material?: string[]
	color?: string[]
	season?: string[]
	sort?: string[]
}

function isMatchedProduct(product: IProduct, options: MatchedOption) {
	const isGlobalCategory =
		arrayWrapper(options.globalCategory)[0] === 'all' ? true : isOptionMatch(product.getGlobalCategory(), options.globalCategory)

	const result = [
		isGlobalCategory,
		isOptionMatch(product.getCategory(), options.category),
		isOptionMatch(product.getColor(), options.color),
		isOptionMatch(product.getMaterial(), options.material),
	]

	return result.every((el) => el)
}

function isOptionMatch(
	productValue: string | string[],
	optionValue: string | string[] | undefined,
	option: { isAllMatchingRequired?: boolean } = {}
) {
	const arrProductValue = arrayWrapper(productValue)
	const arrOptionValue = arrayWrapper(optionValue)

	if (!optionValue) return true
	if (!productValue) return false

	return option.isAllMatchingRequired
		? arrOptionValue.every((el) => arrProductValue.some((prd) => prd === el))
		: arrOptionValue.some((el) => arrProductValue.some((prd) => prd === el))
}

const isSizeMatchedProduct = (product: IProduct, option: string | string[]): boolean => {
	const optionsArr = arrayWrapper(option)

	if (optionsArr.length === 0) return true

	return optionsArr.some((sizeOption) => {
		const productSize = product.getAllSizeOptions()

		return productSize.includes(sizeOption)
	})
}

function getPriceMatchedProducts(product: IProduct, options = ['']) {
	const minPrice = Math.min(...options.map((el) => parseInt(el, 10)))
	const maxPrice = Math.max(...options.map((el) => parseInt(el, 10)))

	if (!options[0] || minPrice === maxPrice) return true
	if (minPrice.toString() === 'NaN' || maxPrice.toString() === 'NaN') {
		console.warn(`Max price must be a number. Price range is "${options}"`)

		return false
	}

	return product.getPrice() >= minPrice && product.getPrice() <= maxPrice
}

function getSortedProducts(products: IProduct[], sort?: InitialFilter['sort']): IProduct[] {
	const sortArr = arrayWrapper(sort)

	sortArr.forEach((sortOption) => {
		switch (sortOption) {
			case 'lowPriceFirst':
				products.sort((a, b) => (a.getPrice() > b.getPrice() ? 1 : -1))
				break

			case 'highPriceFirst':
				products.sort((a, b) => (a.getPrice() > b.getPrice() ? -1 : 1))
				break

			case 'popularity':
				products.sort((a, b) => (a.getPopularity() > b.getPopularity() ? -1 : 1))
				break

			default:
				products.sort((a, b) => (a.getPopularity() > b.getPopularity() ? -1 : 1))
				break
		}
	})

	return products
}
