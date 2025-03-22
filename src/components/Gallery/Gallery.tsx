import { getDataURL } from '@/helpers'
import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import s from './Gallery.module.scss'

export type Item = {
	original: string
	thumbnail: string
}

type Props = {
	items: Item[]
	additionalClass?: string
}

export default function Gallery({ items, additionalClass = '' }: Props) {
	const [size, setSize] = useState('600px')

	return (
		<ImageGallery
			additionalClass={cn(s.wrapper, additionalClass)}
			items={items}
			thumbnailPosition="left"
			showPlayButton={false}
			disableKeyDown
			showBullets
			renderThumbInner={renderThumbInner}
			showThumbnails={false}
			onScreenChange={(isFullScreen) => (isFullScreen ? setSize('100vh') : setSize('600px'))}
			renderItem={(item) => {
				const priority = items[0].original === item.original

				return (
					<div style={{ maxHeight: '100vh', maxWidth: '100%', width: '100%', height: size, position: 'relative' }}>
						<Image
							alt="image"
							priority={priority}
							src={item.original}
							fill
							style={{
								objectFit: 'contain',
							}}
							quality={100}
							placeholder="blur"
							blurDataURL={getDataURL(700, 700)}
						/>
					</div>
				)
			}}
		/>
	)
}

function renderThumbInner({ thumbnail }: ReactImageGalleryItem) {
	const src = thumbnail || ''
	return <Image alt="" src={src} width={92} height={123} />
}
