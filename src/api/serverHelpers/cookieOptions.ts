import { HandlerError } from '@/helpers'

const { SESSION_NAME, SESSION_PASSWORD } = process.env

if (!SESSION_NAME && !SESSION_PASSWORD) {
	HandlerError.addAction('cookieOptions: Can not find the SESSION keys')
}

export default {
	cookieName: SESSION_NAME || '',
	password: SESSION_PASSWORD || '',
}
