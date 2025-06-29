import { MAX_IMAGE_LENGTH } from '@/constants'
import { arrayWrapper, formData, HandlerError } from '@/helpers'
import getPlaceholder from '@/helpers/placeholder'
import { IProductObject } from '@/interfaces'
import type { IFileList } from '@/interfaces/interfaces'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { File } from 'formidable'

export type ImageOptions = {
	color: string[]
	title: string
	preImages?: IProductObject['images']
}
type ImageOptionsWithHash = ImageOptions & { hash: string }

const imageCloudConfig = {
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
}

const IsNotAccessToCloud = !imageCloudConfig.api_key && !imageCloudConfig.api_secret && !imageCloudConfig.cloud_name
if (IsNotAccessToCloud) {
	HandlerError.addAction('ImageCloud: Can not find the imageCloud keys')
}

cloudinary.config(imageCloudConfig)

export default class ImageCloud {
	static async imageUploader(files: IFileList, options: ImageOptionsWithHash) {
		const imagesPomise = this.imageParser(files, options)
		const filePromises: Promise<UploadApiResponse[]>[] = []

		for (let index = 0; index < MAX_IMAGE_LENGTH; index++) {
			const file = formData.getFileArray(files).at(index)
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

	static async deleteImagesByList(imageList: string[]) {
		const promises = imageList.reduce((acc, element) => {
			acc.push(ImageCloud.deleteImageByName(element))

			return acc
		}, [] as Promise<{ result: string }>[])

		return Promise.all(promises)
	}

	static async deleteImage(image: IProductObject['images'][0]) {
		return this.deleteImageByName(image.original)
	}

	private static async deleteImageByName(imageNameOrURL: string) {
		const split = imageNameOrURL.split('/')
		const imageName = imageNameOrURL.includes('http') ? split.at(split.length - 1) : imageNameOrURL

		console.log('Image delated: ', imageName)

		return cloudinary.uploader.destroy(`products/${imageName}`) as Promise<{ result: string }>
	}

	static getImageName(title: string, index: number | string, hash: string) {
		return `${title}__${index}__${hash}`
	}

	static async imageParser(files: IFileList, options: ImageOptionsWithHash) {
		const images: IProductObject['images'] = []
		const fileItems = await Promise.all(
			formData.getFileArray(files).reduce((acc, value, index) => {
				if (value) acc[index] = this.getImageItem(value, index, options)
				return acc
			}, [] as Promise<IProductObject['images'][0]>[])
		)

		for (let index = 0; index < MAX_IMAGE_LENGTH; index++) {
			const file = fileItems.at(index)

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
