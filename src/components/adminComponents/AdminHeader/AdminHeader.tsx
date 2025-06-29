import language from '@/language'
import routes from '@/routes'
import { Typography } from '@mui/material'
import Link from 'next/link'
import s from './AdminHeader.module.scss'

export default function adminHeader() {
	return (
		<div>
			<Typography variant="h3" sx={{ display: { md: 'flex' }, justifyContent: 'space-between', mb: 3 }}>
				<Typography variant="h3">{language.adminMenegment}</Typography>

				<Typography variant="h5">
					<Link href={routes.admin.add} className={s.link}>
						{language.add}
					</Link>
					<Link href={routes.admin.products} className={s.link}>
						{language.toProducts}
					</Link>
				</Typography>
			</Typography>
		</div>
	)
}
