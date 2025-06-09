import type { ProductToAdd } from '@/interfaces'

export interface IProductObject {
	price: number
	popularity: number
	material: string[]
	colors: string[]
	images: { original: string; thumbnail: string; color: string[] }[]
	globalCategory: string
	category: string
	description: string
	title: string
	model: string
	sizes: string[]
	id: string
	selectedSize?: null | string
	creator?: string
}

export type IProduct = ProductStructure
type GetImageURL = (_src: string) => string

export default class ProductStructure {
	#product: IProductObject

	#getImageURL: GetImageURL

	constructor(product: IProductObject) {
		this.#product = product
		this.#getImageURL = (src: string) =>
			src.includes('http') ? src : `https://res.cloudinary.com/butterfly-project/image/upload/v2/products/${src}`
	}

	getAvailableSize = () =>
		this.#product.sizes.reduce<{ [_key in string]: number }>((acc, el) => {
			acc[el] = 1
			return acc
		}, {})

	getAllSizeOptions = () => this.#product.sizes

	getMainImageSrc = () => this.#getImageURL(this.getImages()[0].original)

	getMainImageThumbnail = () => this.getImages()[0].thumbnail

	getPrice = () => this.#product.price

	getPopularity = () => this.#product.popularity

	getColor = () => this.#product.colors

	getMaterial = () => this.#product.material

	getImages = () =>
		this.#product.images.map((el) => ({
			original: this.#getImageURL(el.original),
			thumbnail: el.thumbnail,
			color: el.color,
		}))

	getId = () => this.#product.id

	getGlobalCategory = () => this.#product.globalCategory

	getCategory = () => this.#product.category

	getDescription = () => this.#product.description

	getTitle = () => this.#product.title

	getModel = () => this.#product.model

	getSelectedSize = () => this.#product.selectedSize || ''

	toObject = (): IProductObject => ({
		price: this.getPrice(),
		popularity: this.getPopularity(),
		material: this.getMaterial(),
		colors: this.getColor(),
		images: this.getImages(),
		id: this.getId(),
		globalCategory: this.getGlobalCategory(),
		category: this.getCategory(),
		description: this.getDescription(),
		title: this.getTitle(),
		model: this.getModel(),
		sizes: this.getAllSizeOptions(),
		selectedSize: this.getSelectedSize(),
	})

	toFormObject = (): Omit<ProductToAdd, 'images'> => {
		// eslint-disable-next-line no-unused-vars
		const { images, popularity, id, selectedSize, ...formState } = this.toObject()

		return formState
	}

	static getSeason = () => {
		console.warn('property "season" is deprecated')
		return ''
	}
}
