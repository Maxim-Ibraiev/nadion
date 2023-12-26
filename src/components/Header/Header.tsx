'use client'

import ShoppingBagButton from '@/components/shoppingCollection/ShoppingBagButton'
import CATEGORIES from '@/constants/CATEGORIES'
import language from '@/language'
import Link from '@/lib/next/Link'
import cn from 'classnames'
import { usePathname } from 'next/navigation'
import routes from '../../routes'
import NavMenu from '../navigation/NavMenu'
import s from './Header.module.scss'

export default function Header() {
	const pathName = usePathname()

	return (
		<header className={s.header}>
			<Link href={routes.home} className={s.logo}>
				Butterfly
			</Link>
			<div className={s.nav}>
				<nav>
					<ul className={cn(s.row, s.mobUpper)}>
						{CATEGORIES.map((category) => (
							<li key={category} className={s.navItem}>
								<Link
									href={routes[category]}
									className={cn(s.link, {
										[s.active]: pathName === `/${category}`,
									})}
								>
									<b>{language[category]}</b>
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<ul className={s.row}>
					<li>
						<ShoppingBagButton />
					</li>
					<li className={s.menuBtn}>
						<NavMenu />
					</li>
				</ul>
			</div>
		</header>
	)
}
