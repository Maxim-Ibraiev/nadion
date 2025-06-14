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
				<Link
					passHref
					className={s.link}
					href="https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%A1%D0%B5%D1%80%D0%B0%D1%84%D0%B8%D0%BC%D0%BE%D0%B2%D0%B8%D1%87%D0%B0,+93,+%D0%9A%D1%80%D0%B8%D0%B2%D0%BE%D0%B9+%D0%A0%D0%BE%D0%B3,+%D0%94%D0%BD%D0%B5%D0%BF%D1%80%D0%BE%D0%BF%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0,+50000/@47.9127938,33.4557635,17.54z/data=!4m15!1m8!3m7!1s0x40dadfe03154ab7b:0xb0fa3a177d6b186e!2z0JrRgNC40LLQvtC5INCg0L7Qsywg0JTQvdC10L_RgNC-0L_QtdGC0YDQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0LjQvdCwLCA1MDAwMA!3b1!8m2!3d47.910483!4d33.391783!16zL20vMDJ4ejRy!3m5!1s0x40db210060c4e50f:0x8741ac3729bc0936!8m2!3d47.9131961!4d33.4566665!16s%2Fg%2F11c4rp2zj2?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
				>
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
				<p>{language.aboutUs}</p>
			</div>
		</footer>
	)
}
