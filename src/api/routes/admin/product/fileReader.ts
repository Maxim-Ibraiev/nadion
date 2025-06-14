import formidable, { Files, Options } from 'formidable'
import { NextApiRequest } from 'next'

type FileReader = <T extends string>(req: NextApiRequest) => Promise<{ fields: formidable.Fields<T>; files: Files }>

const fileReader: FileReader = (req) => {
	const options: Options = { maxFileSize: 4000 * 1024 * 1024, multiples: true }

	const form = formidable(options)

	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err)
			resolve({ fields, files })
		})
	})
}

export default fileReader
