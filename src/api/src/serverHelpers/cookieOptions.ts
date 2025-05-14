import getConfig from 'next/config'

const { sessionOptions } = getConfig().serverRuntimeConfig

export default {
	password: sessionOptions.password as string,
	cookieName: sessionOptions.cookieName as string,
}
