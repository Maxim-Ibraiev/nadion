import { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../../Responser'
import { imagesDelete } from './imagesControler'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('req.method', req.method)

	switch (req.method) {
		case 'DELETE': {
			await imagesDelete(req, res)
			break
		}

		default:
			{
				const response = Responser.getMethodNotAllowed(req.method)

				res.status(response.status).json(response)
			}
			break
	}
}
