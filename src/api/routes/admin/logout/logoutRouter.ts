import { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../../Responser'
import { logout } from './logoutControler'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'POST': {
			await logout(req, res)
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
