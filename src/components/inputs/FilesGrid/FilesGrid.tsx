import React, { useState } from 'react'
// import { FieldValues, UseFormRegister } from 'react-hook-form'
import InputFiles from '@/components/inputs/InputFiles'
import { IProductObject } from '@/interfaces'
import type { FormikProps } from 'formik'
import s from './FilesGrid.module.scss'

interface IProps {
	onDeleteItem?: (index: number) => void
	onChange: (files: File[]) => void
	images?: IProductObject['images']
	formik?: FormikProps<{}>
}

export default function FilesGrid({ onChange, onDeleteItem, images = [], formik }: IProps) {
	const [fileList, setFileList] = useState(new Array(6).fill(null))

	const handleChange = (file: File | null, index: number) => {
		const copyValue = [...fileList]
		copyValue[index] = file

		setFileList(copyValue)
		onChange(copyValue)
	}

	return (
		<div className={s.grid}>
			<InputFiles
				onChange={handleChange}
				fileName="image-0"
				index={0}
				onDeleteItem={onDeleteItem}
				imageUrl={images[0]?.original}
				formik={formik}
			/>
			<InputFiles
				onChange={handleChange}
				fileName="image-1"
				index={1}
				onDeleteItem={onDeleteItem}
				imageUrl={images[1]?.original}
				formik={formik}
			/>
			<InputFiles
				onChange={handleChange}
				fileName="image-2"
				index={2}
				onDeleteItem={onDeleteItem}
				imageUrl={images[2]?.original}
				formik={formik}
			/>
			<InputFiles
				onChange={handleChange}
				fileName="image-3"
				index={3}
				onDeleteItem={onDeleteItem}
				imageUrl={images[3]?.original}
				formik={formik}
			/>
			<InputFiles
				onChange={handleChange}
				fileName="image-4"
				index={4}
				onDeleteItem={onDeleteItem}
				imageUrl={images[4]?.original}
				formik={formik}
			/>
			<InputFiles
				onChange={handleChange}
				fileName="image-5"
				index={5}
				onDeleteItem={onDeleteItem}
				imageUrl={images[5]?.original}
				formik={formik}
			/>
		</div>
	)
}
