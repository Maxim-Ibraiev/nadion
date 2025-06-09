import { arrayWrapper } from '@/helpers'
import { getOptionFormat } from '@/helpers/getOptionsFromProducts'
import { useProducts } from '@/hooks'
import type { FilterOption, IProduct } from '@/interfaces'
import language from '@/language'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Icon } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { type FormikProps } from 'formik'

const filter = createFilterOptions<FilterOption>({ trim: true, matchFrom: 'any' })

interface IProps<T> {
	options: FilterOption[]
	name: keyof T & string
	formik: FormikProps<T>
	isMultiple?: true
}

interface IModalMap {
	[key: string]: IProduct[]
}

export default function FreeSoloCreateOption<T extends {}>({ options, name, isMultiple, formik }: IProps<T>) {
	const { getProductsByModel } = useProducts()
	const modalMap: IModalMap = {}

	if (name === 'model') {
		options.forEach((el) => {
			modalMap[el.value] = getProductsByModel(el.value)
		})
	}

	const currentValue = isMultiple
		? getOptionFormat(arrayWrapper(formik.getFieldProps<string[]>(name).value))
		: { label: language[formik.getFieldProps<string>(name).value], value: formik.getFieldProps<string>(name).value }

	return (
		<Autocomplete<FilterOption, undefined | true, false, true>
			selectOnFocus
			handleHomeEndKeys
			openOnFocus
			freeSolo
			clearOnBlur
			multiple={isMultiple}
			options={options}
			value={currentValue}
			renderInput={(params) => <TextField {...params} label={language[name] || name} />}
			onChange={(_, option) => {
				if (typeof option === 'string') formik.setFieldValue(name, option)
				else if (Array.isArray(option))
					formik.setFieldValue(
						name,
						option.map((el) => (typeof el === 'string' ? el : el.value))
					)
				else if (option?.value) formik.setFieldValue(name, option.value)
				else if (!option) formik.setFieldValue(name, '')
				else console.warn('unhandle onChange with option: ', option)
			}}
			filterOptions={(optionsInput, params) => {
				const filtered = filter(optionsInput, params)
				const { inputValue } = params

				const isExisting = optionsInput.some((option) => inputValue === option.value)
				const unselectedOptions = filtered.filter((filteredOption) =>
					Array.isArray(currentValue)
						? !currentValue.map((el) => el.value).includes(filteredOption.value)
						: currentValue.value !== filteredOption.value
				)

				if (inputValue !== '' && !isExisting) unselectedOptions.push({ label: `${language.add} "${inputValue}"`, value: inputValue })

				return unselectedOptions
			}}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === 'string') return option

				return option.label || language[option.value] || option.value
			}}
			renderOption={({ key, ...optionProps }, option) => (
				<Box component="li" key={key} {...optionProps}>
					{name === 'colors' && <CircleIcon htmlColor={option.value} />}
					{name === 'model' && modalMap[option.value] && (
						<Icon
							sx={{
								mr: 1,
								backgroundImage: `url(${modalMap[option.value].at(0)?.getMainImageSrc()})`,
								objectFit: 'contain',
								backgroundPosition: 'center',
								backgroundSize: '100%',
							}}
						/>
					)}
					{option.label}
				</Box>
			)}
		/>
	)
}
