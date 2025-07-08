/* eslint-disable no-underscore-dangle */

import connectToDatabase from '@/api/connectToDb'
import type { CartSchema } from '@/interfaces'
import chatModel from './chatsListSchema'

export const getChatsFromDB = async () => {
	await connectToDatabase()

	const chats = await chatModel.find()
	return chats.map((chat) => ({
		...chat.toObject(),
		_id: chat._id.toString(),
	}))
}

export const addChatToDB = async (chatPromt: CartSchema) => {
	await connectToDatabase()

	const chat = await chatModel.find({ chatId: chatPromt.chatId })

	if (!chat[0]) {
		const newChat = await chatModel.create(chatPromt)
		return { ...newChat.toObject() }
	} else {
		return { ...chat[0].toObject() }
	}
}

export const updateSubToDB = async (chatId: number, actoin: 'add' | 'remove', option: string) => {
	await connectToDatabase()

	const chatArr = await chatModel.find({ chatId })
	const chat = chatArr[0].toObject()

	if (chat) {
		if (!chat.subscriptions.includes(option) && actoin === 'add')
			return chatModel.findByIdAndUpdate({ _id: chat._id }, { subscriptions: [...chat.subscriptions, option] })
		if (actoin === 'remove')
			return chatModel.findByIdAndUpdate({ _id: chat._id }, { subscriptions: chat.subscriptions.filter((el) => el !== option) })
	}

	return null
}

export const deleteChatFromDB = async (chatId: number) => {
	await connectToDatabase()

	const chat = await chatModel.findOneAndDelete({ chatId })

	return chat ? { ...chat.toObject() } : null
}
