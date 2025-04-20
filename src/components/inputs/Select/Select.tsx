import type { FilterOption } from '@/interfaces'
import language from '@/language'
import { Box, MenuItem } from '@mui/material'
import SelectMU, { SelectProps } from '@mui/material/Select'
import { FormikProps } from 'formik'

interface IProps<FormState extends {}> extends Omit<SelectProps, 'name'> {
	name: keyof FormState & string
	formik: FormikProps<FormState>
	options?: FilterOption[]
}

export default function Select<FormState extends {}>({
	name,
	formik,
	options,
	children,
	...props
}: React.PropsWithChildren<IProps<FormState>>) {
	return (
		<Box>
			<SelectMU {...formik.getFieldProps(name)} label={language[name] || name} {...props}>
				{options?.map(({ value, label }) => (
					<MenuItem key={value} value={value}>
						{label}
					</MenuItem>
				))}
				{children}
			</SelectMU>
		</Box>
	)
}
