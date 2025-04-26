import type { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../../Responser'
import { updateAdd, updateImages } from './imagesControler'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'PATCH':
			await updateImages(req, res)
			break
		case 'POST':
			await updateAdd(req, res)
			break

		default:
			{
				const response = Responser.getMethodNotAllowed(req.method)

				res.status(response.status).json(response)
			}
			break
	}
}
