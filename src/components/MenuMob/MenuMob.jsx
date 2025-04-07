/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { categories } from '@/constants'
import language from '@/language'
import Link from '@/lib/next/Link'
import routes from '@/routes'
import { forwardRef } from 'react'
import s from './MenuMob.module.scss'

const MenuMob = forwardRef(() => (
	<ul className={s.container}>
		{categories.map((category) => (
			<li key={category} className={s.item}>
				<Link href={routes[category]} role="button">
					{language[category] || category}
				</Link>
			</li>
		))}
	</ul>
))

MenuMob.displayName = 'MenuMob'
export default MenuMob
