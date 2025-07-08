/* eslint-disable import/prefer-default-export */
import bot, { subscriptions } from '@/api/services/telegram'
import { HandlerError } from '@/helpers'
import type { IError, IProductObject, IResponse } from '@/interfaces'
import language from '@/language'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PostStateType } from '../../../../pages/checkout'
import Responser from '../Responser'
import { getChatsFromDB } from './chatListModels'

export const alert = async (req: NextApiRequest, res: NextApiResponse) => {
	const products = req.body.products as IProductObject[]
	const form = req.body.form as PostStateType

	let response: IResponse<null | IError> | null = null
	const chatsList = await getChatsFromDB()

	try {
		const messagesPromise = chatsList.map(async (chat) => {
			if (chat.subscriptions.includes(subscriptions.NEW_ORDER)) {
				await bot.api.sendMediaGroup(
					chat.chatId,
					products.map((el) => ({
						type: 'photo',
						media: el.images[0].original,
					}))
				)

				return bot.api.sendMessage(
					chat.chatId,
					`*Нове Замовлення* ${products.map(
						(el, ind) => `\n${ind + 1}) [${el.title}](http://nadion.net/product/${el.id}) ${el.selectedSize}`
					)} \n *Дані із форми:* ${Object.entries(form).map(([key, value]) => `\n${language[key] || key}: *${value}*`)}`,
					{
						parse_mode: 'Markdown',
					}
				)
			}
			return null
		})

		await Promise.all(messagesPromise)

		response = Responser.getOK(null)

		return res.status(response.status).json(response)
	} catch (error) {
		HandlerError.addAction('telegram alert error', error)
		return res.status(500).json({ status: 500, message: 'telegram alert error.', error })
	}
}
