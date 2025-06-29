import cookieOptions from '@/api/serverHelpers/cookieOptions'
import type { IAdmin } from '@/interfaces'
import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../../Responser'
import { imagesDelete } from './imagesControler'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getIronSession<IAdmin>(req, res, cookieOptions)

	if (!session.auth) {
		const response = Responser.getForbidden(null)
		res.status(response.status).json(response)
		return
	}

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
