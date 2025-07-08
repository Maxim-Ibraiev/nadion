import type { CartSchema } from '@/interfaces'
import { Schema, model, type Model } from 'mongoose'

const chatsSchema = new Schema<CartSchema>(
	{
		subscriptions: {
			type: [String],
			required: [true, 'Title is required'],
			minlength: 1,
			maxlength: [9999, 'Too long'],
		},
		chatId: {
			type: Number,
			required: [true, 'Description is required'],
			minlength: 1,
			maxlength: [999, 'Too long'],
		},
	},
	{
		bufferTimeoutMS: 300000,
		versionKey: false,
	}
)

declare global {
	// eslint-disable-next-line no-unused-vars, vars-on-top, no-var
	var chatModel: Model<CartSchema> | undefined
}

if (!globalThis.chatModel) {
	globalThis.chatModel = model<CartSchema>('telegram-chats', chatsSchema)
}

const CardModel = globalThis.chatModel
export default CardModel
