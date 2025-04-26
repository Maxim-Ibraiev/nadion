import type { ProductToAdd } from '@/interfaces'
import type { IFileImage } from '@/interfaces/interfaces'
import Joi from 'joi'

export default class Validation {
	static id = Joi.string().required().min(24).max(24)

	static adminLogin = Joi.object({
		login: Joi.string().min(1).max(99).required(),
		password: Joi.string().min(1).max(99).required(),
	})

	static shoppingBag = Joi.object({
		selectedProducts: Joi.array()
			.required()
			.items(Joi.object({ selectedSize: Joi.string().min(0).max(99), id: this.id })),
	})

	static file = Joi.object({
		myImage: Joi.array().min(2).max(10),
	})

	static fileSchema = Joi.array<IFileImage>()
		.items({
			filepath: Joi.string().max(300),
			mimetype: Joi.string().max(300),
			mtime: Joi.string().max(300),
			newFilename: Joi.string().max(300),
			originalFilename: Joi.string().max(300),

			_events: Joi.optional(),
			_eventsCount: Joi.optional(),
			_maxListeners: Joi.optional(),
			_writeStream: Joi.optional(),
			lastModifiedDate: Joi.optional(),
			hashAlgorithm: Joi.optional(),
			hash: Joi.optional(),
		})
		.single()

	static fileListToAdd = Joi.array().items(this.fileSchema).min(2).max(10)

	static fileListToUpdate = Joi.object({
		'image-0': this.fileSchema,
		'image-1': this.fileSchema,
		'image-2': this.fileSchema,
		'image-3': this.fileSchema,
		'image-4': this.fileSchema,
		'image-5': this.fileSchema,
	})

	static imageItem = Joi.object({
		original: Joi.string().min(1).max(999),
		thumbnail: Joi.string().min(1).max(999),
		color: Joi.array().min(1).max(99),
	})

	static images = Joi.array().items(this.imageItem).min(2).max(10).required()

	static productToAdd = Joi.object<ProductToAdd>({
		// images: this.fileListToAdd,
		title: Joi.string().min(3).max(1000).required(),
		description: Joi.string().min(3).max(1000).required(),
		globalCategory: Joi.string().min(3).max(999).required(),
		category: Joi.string().min(3).max(999).required(),
		price: Joi.number().min(1).max(999999),
		colors: Joi.array().items(Joi.string().min(1).max(30)).min(1).max(3),
		model: Joi.string().min(3).max(1000),
		sizes: Joi.array().items(Joi.string().min(1).max(30)).min(1).max(10),
		material: Joi.array().min(1).max(99),
	})

	static updateImage = this.images.min(0).allow()

	static updateProduct = Joi.object({
		images: this.updateImage.optional(),
		title: Joi.string().min(3).max(1000).required().optional(),
		description: Joi.string().min(3).max(1000).required().optional(),
		globalCategory: Joi.string().min(3).max(999).required().optional(),
		category: Joi.string().min(3).max(999).required().optional(),
		price: Joi.number().min(1).max(999999).optional(),
		colors: Joi.array().items(Joi.string().min(1).max(30)).max(3).optional(),
		model: Joi.string().min(3).max(1000).optional(),
		sizes: Joi.array().items(Joi.string().min(1).max(30)).max(10).optional(),
		material: Joi.array().min(1).max(99).optional(),
		season: Joi.string().min(3).max(999).optional(),
		popularity: Joi.number().min(-999).max(999999).optional(),
	})

	static imageOptions = Joi.object({
		title: Joi.string().min(3).max(1000),
		color: Joi.array().items(Joi.string().min(1).max(1000)),
		id: Joi.array().items(Joi.string().min(0).max(9999)).single(),
		preImages: this.updateImage,
	})
}
