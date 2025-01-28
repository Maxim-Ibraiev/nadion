import { TextField, TextFieldProps } from '@mui/material'
import { FormikProps } from 'formik'

interface IProps<FormState extends {}> extends Omit<TextFieldProps, 'variant' | 'name'> {
	name: keyof FormState & string
	formik: FormikProps<FormState>
}

export default function Input<FormState extends {}>({ name, formik, ...props }: IProps<FormState>) {
	return <TextField {...formik.getFieldProps(name)} {...props} />
}
