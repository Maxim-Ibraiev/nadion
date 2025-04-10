import { FilterOption, InitialFilter, IProduct } from '../interfaces'
import languagePack from '../language'

// type IOptionsFromProduct = {
// 	[Property in keyof InitialFilter]: FilterOption[]
// }
type IOptionsFromProduct = Omit<Record<keyof InitialFilter, FilterOption[]>, 'globalCategory'>
type TInitionalOptions = {
	sizes: string[]
	material: string[]
	colors: string[]
	category: string[]
	model: string[]
	brand: string[]
	price: number[]
}

export const getOptionFormat = (arr: string[]) =>
	arr.map((el) => ({ value: el, label: languagePack[el as keyof typeof languagePack] || el }))

const getOptionsFromProducts = (products: IProduct[]): IOptionsFromProduct => {
	const initialOptions: TInitionalOptions = {
		sizes: [],
		material: [],
		colors: [],
		category: [],
		model: [],
		brand: [],
		price: [],
	}

	const allOptions = products.reduce((acc, product) => {
		acc.sizes.push(...product.getAllSizeOptions())
		acc.material.push(...product.getMaterial())
		acc.category.push(product.getCategory())
		acc.model.push(product.getModel())
		acc.colors.push(...product.getColor())
		acc.brand.push(product.getTitle())
		acc.price.push(product.getPrice())

		return acc
	}, initialOptions)

	const setOptions = {
		size: Array.from(new Set(allOptions.sizes)),
		material: Array.from(new Set(allOptions.material)),
		color: Array.from(new Set(allOptions.colors)),
		category: Array.from(new Set(allOptions.category)),
		model: Array.from(new Set(allOptions.model)),
		brand: Array.from(new Set(allOptions.brand)),
		prince: Array.from(new Set(allOptions.price)),
	}

	return {
		size: getOptionFormat(setOptions.size),
		material: getOptionFormat(setOptions.material),
		color: getOptionFormat(setOptions.color),
		category: getOptionFormat(setOptions.category),
		model: getOptionFormat(setOptions.model),
		brand: getOptionFormat(setOptions.brand),
		price: [
			{ value: '0', label: '0' },
			{ value: String(Math.max(...setOptions.prince)), label: String(Math.max(...setOptions.prince)) },
		],
		sort: [
			{ value: 'popularity', label: languagePack.popularity },
			{ value: 'highPriceFirst', label: languagePack.highPriceFirst },
			{ value: 'lowPriceFirst', label: languagePack.lowPriceFirst },
		],
	}
}

export default getOptionsFromProducts
