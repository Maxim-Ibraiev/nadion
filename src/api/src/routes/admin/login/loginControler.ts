import cookieOptions from '@/api/src/serverHelpers/cookieOptions'
import type { IAdmin, IError, IResponse } from '@/interfaces'
import { getIronSession } from 'iron-session'
import type { NextApiRequest, NextApiResponse } from 'next'
import Validation from '../../middleware/Validation'
import Responser from '../../Responser'
import { adminLogin } from './loginModel'

// eslint-disable-next-line import/prefer-default-export
export const login = async (req: NextApiRequest, res: NextApiResponse) => {
	let response: IResponse<IAdmin | IError> | null = null

	// validation
	const { error, value } = Validation.adminLogin.validate(req.body)
	if (error) {
		response = Responser.getBadRequest(error)
		res.status(response.status).json(response)

		return
	}

	try {
		// adminLogin
		const adminResponse = await adminLogin(value)

		const session = await getIronSession<IAdmin>(req, res, cookieOptions)

		Object.assign(session, adminResponse.data, { name: value.login })
		await session.save()

		response = adminResponse.data ? Responser.getOK<IAdmin>(adminResponse.data) : Responser.getForbidden(adminResponse.error)
	} catch (e) {
		response = Responser.getServerError(e)
	}
	res.status(response.status).json(response)
}
