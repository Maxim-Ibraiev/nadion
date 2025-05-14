import cookieOptions from '@/api/src/serverHelpers/cookieOptions'
import type { IAdmin } from '@/interfaces'
import { getIronSession } from 'iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'
import Responser from '../../Responser'

// eslint-disable-next-line import/prefer-default-export
export async function logout(req: NextApiRequest, res: NextApiResponse) {
	const session = await getIronSession<IAdmin>(req, res, cookieOptions)
	session.destroy()
	session.save()

	const response = Responser.getOK(null)
	res.status(response.status).json(response)
}
