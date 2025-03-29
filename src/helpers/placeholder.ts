import { getPlaiceholder } from 'plaiceholder'
import { HandlerError, getDataURL } from '.'

export default async function getPlaceholder(url: string) {
	try {
		const file = await fetch(url)
		const buffer = await file.arrayBuffer()

		const { base64 } = await getPlaiceholder(Buffer.from(buffer), { size: 20 })

		return base64
	} catch (err) {
		HandlerError.placeHolder(err)

		return getDataURL(700, 700)
	}
}
