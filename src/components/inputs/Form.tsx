import { PureComponent } from 'react'
import CreatableInput from './CreatableInput'
import FilesGrid from './FilesGrid'
import Input from './Input'
import Select from './Select'

export default class Form extends PureComponent {
	static Select = Select

	static Input = Input

	static CreatableInput = CreatableInput

	static FilesGrid = FilesGrid
}
