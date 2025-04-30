import { arrayWrapper } from '@/helpers'
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
		// todo thumbnail as plaseholder base64
		const hash = String(Math.floor(Math.random() * 1000))

		const filePromises: Promise<UploadApiResponse[]>[] = []

		for (let index = 0; index < Object.keys(files).length; index++) {
			const file = Object.entries(files).at(index)?.[1]
			const originFile = options.preImages && options.preImages[index]

			if (file && originFile) this.deleteImage(originFile)
			if (file) {
				const fileResponse = this.fileUploader(file, { title: options.title, index, hash })

				filePromises.push(fileResponse)
			}
		}

		return Promise.all(filePromises).then((el) => el.flat())
	}

	private static async fileUploader(files: File | File[], options: { title: string; hash: string; index?: number }) {
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

	static imageParser(files: IFileList, options: ImageOptionsWithHash) {
		// if (files.images) {
		// 	return arrayWrapper(files.images).map((_, ind) => this.getImageItem(ind, options))
		// }

		const images: IProductObject['images'] = []

		for (let index = 0; index < Object.keys(files).length; index++) {
			const file = Object.entries(files).at(index)?.[1]

			if (file) {
				images[index] = this.getImageItem(index, options)
			} else if (options.preImages) {
				images[index] = options.preImages[index]
			}
		}

		return images.filter(Boolean)
	}

	private static getImageItem = (index: number, options: ImageOptionsWithHash) => ({
		original: ImageCloud.getImageName(options.title, index, options.hash),
		thumbnail: ImageCloud.getImageName(options.title, index, options.hash),
		color: options.color,
	})
}
