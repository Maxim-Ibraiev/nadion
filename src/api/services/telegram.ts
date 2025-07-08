import { HandlerError } from '@/helpers'
import { Bot, Keyboard } from 'grammy'
import { addChatToDB, deleteChatFromDB, updateSubToDB } from '../routes/alert/chatListModels'

const token = process.env.BOT_TOKEN || ''
const bot = new Bot(token)

export const subscriptions = {
	NEW_ORDER: 'newOrder',
	NEW_ERROR: 'newError',
}

const comands = {
	SUBSCRIBE: 'subscribe',
	UNSUBSCRIBE: 'unsubscribe',
	ERROR_SUBSCRIBE: 'ErrorSubscribe',
	ERROR_UNSUBSCRIBE: 'ErrorUnsubscribe',
}

const ERROR_MESSAGE = 'Сталась помился. Скоро ми виправимо.'

bot.command('start', async (ctx) => {
	const markup = new Keyboard([
		[{ text: `/${comands.SUBSCRIBE}` }, { text: `/${comands.UNSUBSCRIBE}` }],
		[{ text: `/${comands.ERROR_SUBSCRIBE}` }, { text: `/${comands.ERROR_UNSUBSCRIBE}` }],
	])

	await ctx.reply(
		`Вітаю вас! тут ви можете підписатися на нашу росилку з замовленнями. \n /${comands.SUBSCRIBE} \n /${comands.UNSUBSCRIBE}`,
		{ reply_markup: markup }
	)
})

bot.command(comands.SUBSCRIBE, async (ctx) => {
	try {
		await addChatToDB({ chatId: ctx.chatId, subscriptions: [subscriptions.NEW_ORDER] })
		ctx.reply('Ви успішно підписалися')
	} catch (error) {
		ctx.reply(ERROR_MESSAGE)
		HandlerError.addAction('telegram subscribe error', error)
	}
})

bot.command(comands.ERROR_UNSUBSCRIBE, async (ctx) => {
	try {
		await deleteChatFromDB(ctx.chatId)
		ctx.reply('Ви успішно відписалися')
	} catch (error) {
		ctx.reply(ERROR_MESSAGE)
		HandlerError.addAction('telegram unsubscribe error', error)
	}
})

bot.command(comands.SUBSCRIBE, async (ctx) => {
	try {
		await updateSubToDB(ctx.chatId, 'add', subscriptions.NEW_ERROR)
		ctx.reply('Ви успішно відписалися')
	} catch (error) {
		ctx.reply(ERROR_MESSAGE)
		HandlerError.addAction('telegram unsubscribe error', error)
	}
})

bot.command(comands.ERROR_UNSUBSCRIBE, async (ctx) => {
	try {
		await updateSubToDB(ctx.chatId, 'remove', subscriptions.NEW_ERROR)
		ctx.reply('Ви успішно відписалися')
	} catch (error) {
		ctx.reply(ERROR_MESSAGE)
		HandlerError.addAction('telegram unsubscribe error', error)
	}
})

bot.on('message', (ctx) => ctx.reply('Ця команда не підтримується'))

if (!bot.isRunning()) bot.start()

export default bot
