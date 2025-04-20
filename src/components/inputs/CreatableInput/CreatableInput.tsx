import type { FilterOption } from '@/interfaces'
import language from '@/language'
import CircleIcon from '@mui/icons-material/Circle'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { type FormikProps } from 'formik'

const filter = createFilterOptions<FilterOption>()

interface IProps<T> {
	options: FilterOption[]
	name: keyof T & string
	formik: FormikProps<T>
	isMultiple?: true
}

export default function FreeSoloCreateOption<T extends {}>({ options, name, isMultiple, formik }: IProps<T>) {
	return (
		<Autocomplete<FilterOption, true, false, true>
			selectOnFocus
			handleHomeEndKeys
			openOnFocus
			freeSolo
			clearOnBlur
			multiple={isMultiple}
			options={options}
			renderInput={(params) => <TextField {...params} label={language[name] || name} />}
			onChange={(_, option) => {
				if (typeof option === 'string') formik.setFieldValue(name, option)
				else if (isMultiple ? option : option.values) formik.setFieldValue(name, option)
				else formik.setFieldValue(name, option)
			}}
			filterOptions={(optionsInput, params) => {
				const filtered = filter(optionsInput, params)
				const { inputValue } = params

				// Suggest the creation of a new value
				const isExisting = optionsInput.some((option) => inputValue === option.value)
				if (inputValue !== '' && !isExisting) filtered.push({ label: `${language.add} "${inputValue}"`, value: inputValue })

				return filtered
			}}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === 'string') return option
				return language[option.value] || option.value
			}}
			renderOption={({ key, ...optionProps }, option) => (
				<li key={key} {...optionProps}>
					{name === 'colors' && <CircleIcon htmlColor={option.value} />}
					{option.label}
				</li>
			)}
		/>
	)
}
