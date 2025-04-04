import { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../../Responser'
import { add, edit } from './productControler'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': {
			await add(req, res)
			break
		}

		case 'PATCH': {
			await edit(req, res)
			break
		}

		// case 'DELETE': {
		//   await productDelete(req, res)
		//   break
		// }

		default:
			{
				const response = Responser.getMethodNotAllowed(req.method)

				res.status(response.status).json(response)
			}
			break
	}
}
