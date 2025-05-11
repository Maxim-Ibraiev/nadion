import type { File } from 'formidable'
import { promises as fs } from 'fs'
import { getPlaiceholder } from 'plaiceholder'
import { HandlerError, getDataURL } from '.'

export default async function getPlaceholder(file: [File]) {
	try {
		const buffer = await fs.readFile(file[0].filepath)

		const { base64 } = await getPlaiceholder(buffer, { size: 20 })

		return base64
	} catch (err) {
		HandlerError.addAction(`getPlaceholder error.`)

		return getDataURL(700, 700)
	}
}
