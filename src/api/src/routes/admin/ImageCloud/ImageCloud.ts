import { MAX_IMAGE_LENGTH } from '@/constants'
import { arrayWrapper } from '@/helpers'
import getPlaceholder from '@/helpers/placeholder'
import { IProductObject } from '@/interfaces'
import type { IFileList } from '@/interfaces/interfaces'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { File } from 'formidable'
import getConfig from 'next/config'

export type ImageOptions = {
	color: string[]
	title: string
	preImages?: IProductObject['images']
}

type ImageOptionsWithHash = ImageOptions & { hash: string }

const { imageCloudConfig } = getConfig().serverRuntimeConfig

cloudinary.config(imageCloudConfig)

export default class ImageCloud {
	static async imageUploader(files: IFileList, options: ImageOptionsWithHash) {
		const imagesPomise = this.imageParser(files, options)
		const filePromises: Promise<UploadApiResponse[]>[] = []

		for (let index = 0; index < MAX_IMAGE_LENGTH; index++) {
			const file = Object.values(files).at(index)
			const originFile = options.preImages && options.preImages[index]

			if (file && originFile) this.deleteImage(originFile)
			if (file) {
				const fileResponse = this.filesUploader(file, { title: options.title, index, hash: options.hash })
				filePromises.push(fileResponse)
			}
		}

		const cloudImages = await Promise.all(filePromises).then((el) => el.flat())
		const images = await imagesPomise

		return { images, cloudImages }
	}

	private static async filesUploader(files: File | File[], options: { title: string; hash: string; index?: number }) {
		const arrFiles = arrayWrapper(files)
		const data: UploadApiResponse[] = []

		return new Promise<UploadApiResponse[]>((resolve, reject) => {
			arrFiles.forEach(async (file, ind) => {
				try {
					const res = await cloudinary.uploader.upload(file.filepath, {
						folder: 'products',
						public_id: this.getImageName(options.title, options.index || ind, options.hash),
					})
					data.push(res)

					if (data.length === arrFiles.length) {
						resolve(data)
					}
				} catch (error) {
					reject(error)
				}
			})
		})
	}

	static async deleteImage(image: IProductObject['images'][0]) {
		return cloudinary.uploader.destroy(`products/${image.original}`)
	}

	static getImageName(title: string, index: number | string, hash: string) {
		return `${title}__${index}`
	}

	static async imageParser(files: IFileList, options: ImageOptionsWithHash) {
		const images: IProductObject['images'] = []
		const fileItems = await Promise.all(
			Object.values(files).reduce((acc, value, index) => {
				acc[index] = this.getImageItem(value, index, options)

				return acc
			}, [] as Promise<IProductObject['images'][0]>[])
		)

		for (let index = 0; index < MAX_IMAGE_LENGTH; index++) {
			const file = Object.values(files).at(index)

			if (file) {
				images[index] = fileItems[index]
			} else if (options.preImages) {
				images[index] = options.preImages[index]
			}
		}

		return images.filter(Boolean)
	}

	private static getImageItem = async (file: [File], index: number, options: ImageOptionsWithHash) => ({
		original: ImageCloud.getImageName(options.title, index, options.hash),
		thumbnail: await getPlaceholder(file),
		color: options.color,
	})
}
