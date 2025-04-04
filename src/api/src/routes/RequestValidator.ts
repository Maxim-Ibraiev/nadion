import formidable from 'formidable'
import { ILoginData, IShoppingBag, type IProduct } from '../../../interfaces'
import {
	adminLoginValidation,
	fileListToAddValidation,
	fileListToUpdateValidation,
	fileValidation,
	idValidation,
	imageOptionsValidation,
	productToAddValidation,
	shoppingBagValidation,
	updateImage,
	updateProductValidation,
} from './middleware/validation'

export default class RequestValidator {
	static shoppingBag = (body: IShoppingBag) => shoppingBagValidation.validate(body)

	static id = (id: string | string[]) => idValidation.validate(id)

	static adminLogin = (body: ILoginData) => adminLoginValidation.validate(body)

	static fileList = (files: formidable.Files) => fileValidation.validate(files)

	static product = (product: IProduct) => productToAddValidation.validate(product)

	static updateImage = (product: IProduct) => updateImage.validate(product)

	static productUpdate = (product: IProduct) => updateProductValidation.validate(product)

	static imageOptions = (imageItem: ReturnType<IProduct['getImages']>[0]) => imageOptionsValidation.validate(imageItem)

	static fileListToUpdate = (files: formidable.Files) => fileListToUpdateValidation.validate(files)

	static fileListToAdd = (files: formidable.Files) => fileListToAddValidation.validate(files)
	// static receivingproductforUpdate = product => receivingproductforUpdate.validate(product)
}
