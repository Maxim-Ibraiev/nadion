import type { FormikProps } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'
import s from './InputFiles.module.scss'

interface IProps {
	fileName: string
	index: number
	onChange: (file: File | null, index: number) => void
	onDeleteItem?: (index: number) => void
	imageUrl?: string | null
	formik?: FormikProps<{}>
}

export default function InputFiles({ fileName, index, onChange, onDeleteItem, imageUrl = null, formik }: IProps) {
	const [selectedImages, setSelectedImages] = useState<string | null>(imageUrl)

	const registerOptions = formik ? formik.getFieldProps(fileName) : null

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const file = e.target.files?.item(0) || null

		if (file) {
			setSelectedImages(URL.createObjectURL(file))
		} else {
			setSelectedImages(imageUrl)
		}

		onChange(file, index)
	}

	const handleDelete = () => {
		setSelectedImages(null)
		onChange(null, index)

		if (onDeleteItem) onDeleteItem(index)
	}

	return (
		<div className={s.addContainer}>
			{selectedImages && (
				<div className={s.imageContainer}>
					<Image src={selectedImages} alt="Image to add" height={125} width={100} className={s.image} />
				</div>
			)}
			<div className={s.border}>
				<input className={s.input} type="file" accept=".jpg,.png,.jpeg" name={fileName} {...registerOptions} onChange={handleChange} />
			</div>

			{selectedImages && (
				<button type="button" className={s.deleteButton} onClick={handleDelete}>
					{' '}
				</button>
			)}
		</div>
	)
}
