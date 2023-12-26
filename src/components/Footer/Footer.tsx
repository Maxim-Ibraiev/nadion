import LocationIcon from '@/components/icons/Location'
import MailIcon from '@/components/icons/Mail'
import PhoneIcon from '@/components/icons/Phone'
import language from '@/language'
import Link from '@/lib/next/Link'
import React from 'react'
import s from './Footer.module.scss'

export default function Footer() {
	return (
		<footer className={s.container}>
			<div className={s.contacts}>
				<Link href="/a" passHref className={s.link}>
					<LocationIcon fill="white" height="38px" className={s.icon} />
					<span className={s.adress}>
						<span className={s.street}>{language.adressOfCompany}</span>
						<span className={s.contry}>{language.cityOfCompany}</span>
					</span>
				</Link>
				<Link href="tel:+380 97 00 000" passHref className={s.link}>
					<PhoneIcon fill="white" height="38px" className={s.icon} />
					<span>+380 97 00 000</span>
				</Link>
				<Link href="mailto:support@butterfly.com" passHref className={s.link}>
					<MailIcon fill="white" height="38px" className={s.icon} />
					<span>support@butterfly.com</span>
				</Link>
			</div>
			<div className={s.about}>
				<h4>{language.aboutOurCompany}</h4>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi repellendus cum, molestias expedita excepturi est nostrum magni
					fuga debitis fugiat rerum odio maiores quaerat dolorem, deleniti consectetur accusamus distinctio dignissimos?
				</p>
			</div>
		</footer>
	)
}
