import { PureComponent } from 'react'
import Input from './Input'
import Select from './Select'

export default class Form extends PureComponent {
	static Select = Select

	static Input = Input
}
