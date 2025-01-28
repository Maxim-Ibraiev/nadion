import SelectMU, { SelectProps } from '@mui/material/Select'
import { FormikProps } from 'formik'

interface IProps<FormState extends {}> extends Omit<SelectProps, 'name'> {
	name: keyof FormState & string
	formik: FormikProps<FormState>
}

export default function Select<FormState extends {}>({ name, formik, children, ...props }: React.PropsWithChildren<IProps<FormState>>) {
	return (
		<SelectMU {...formik.getFieldProps(name)} {...props}>
			{children}
		</SelectMU>
	)
}
