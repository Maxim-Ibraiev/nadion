import type { ICloudImageResponse } from '@/interfaces/interfaces'
import { AxiosError } from 'axios'
import Joi from 'joi'
import { Categories, IAdmin, IError, IProductObject, IResponse, IShoppingBag } from '../../../interfaces'
import httpStatusCodes from '../httpStatusCodes'

type InputData<Type> = {
	status: number
	data?: Type | null
	error?: IError | null
	message?: string
}

type Data =
	| Categories
	| IProductObject
	| IProductObject[]
	| IProductObject['images']
	| ICloudImageResponse
	| IShoppingBag
	| IAdmin
	| null
	| IError

class Responser {
	static getBaseResponse<T extends Data>({ status, data = null, error, message = error?.message ?? '' }: InputData<T>): IResponse<T> {
		return {
			status,
			data,
			error: error ? { message, data: error.data || JSON.stringify(error) } : null,
		}
	}

	static getOK<T extends Data>(data: T) {
		return this.getBaseResponse({ data, status: httpStatusCodes.OK })
	}

	static getNoContent() {
		return this.getBaseResponse({ status: httpStatusCodes.NoContent })
	}

	static getBadRequest(error: Joi.ValidationError) {
		return this.getBaseResponse<IError>({
			status: httpStatusCodes.BAD_REQUEST,
			error: { message: error.message, data: error },
		})
	}

	static getNotFound<T extends Data>(error: IError, data?: T) {
		return this.getBaseResponse({ data, status: httpStatusCodes.NOT_FOUND, error })
	}

	static getMethodNotAllowed(method?: string | undefined) {
		return this.getBaseResponse({
			status: httpStatusCodes.METHOD_NOT_ALLOWED,
			error: {
				message: `Method "${method}" not allowed`,
				data: null,
			},
		})
	}

	static getForbidden(error: IError) {
		return this.getBaseResponse<IError>({ status: httpStatusCodes.FORBIDDEN, error })
	}

	static getServerError(error: unknown) {
		if (error instanceof AxiosError) {
			return this.getBaseResponse<IError>({
				message: error.message,
				status: error.status || httpStatusCodes.INTERNAL_SERVER_ERROR,
				error: { data: error.name + error.stack, message: error.message },
			})
		}

		console.error('Server error middleware, ', error)

		if (error instanceof Error) {
			return this.getBaseResponse<IError>({
				status: httpStatusCodes.INTERNAL_SERVER_ERROR,
				error: { data: error.name + error.stack, message: error.message },
			})
		}

		return this.getBaseResponse<IError>({
			status: httpStatusCodes.INTERNAL_SERVER_ERROR,
			error: { data: error, message: 'Server error' },
		})
	}
}

export default Responser
