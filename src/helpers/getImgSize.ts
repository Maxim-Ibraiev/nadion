export default function getImgSize() {
	const bodyWidth = Math.min(document.body.clientWidth, 1200)
	const numberOfColumns = () => {
		if (bodyWidth >= 1000) return 4
		if (bodyWidth >= 768) return 3

		return 2
	}
	const imgWidth = (bodyWidth - 37) / numberOfColumns()
	const imgHeight = imgWidth / 0.75

	return { width: imgWidth, height: imgHeight }
}
