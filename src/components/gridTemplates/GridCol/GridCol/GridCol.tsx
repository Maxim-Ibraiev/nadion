import { Box } from '@mui/material'
import s from './GridCol.module.scss'

export default function GridCol({ children }: React.PropsWithChildren) {
	return <Box className={s.wrapper}>{children}</Box>
}
