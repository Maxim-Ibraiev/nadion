const routes = {
	home: '/',
	category: '/[globalCategory]',
	categories: {
		dress: '/dress',
		suit: '/suit',
		jeans: '/jeans',
		largeSizes: '/largeSizes',
		shirts: '/shirts',
		tShirt: '/t-shirt',
	},
	femaleClothes: '/femaleClothes',
	maleClothes: '/maleClothes',
	childrenClothes: '/childrenClothes',
	handMade: '/handMade',
	all: '/all',
	products: '/products',
	product: '/product',
	checkout: '/checkout',
	googleMap:
		'https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%A1%D0%B5%D1%80%D0%B0%D1%84%D0%B8%D0%BC%D0%BE%D0%B2%D0%B8%D1%87%D0%B0,+93,+%D0%9A%D1%80%D0%B8%D0%B2%D0%BE%D0%B9+%D0%A0%D0%BE%D0%B3,+%D0%94%D0%BD%D0%B5%D0%BF%D1%80%D0%BE%D0%BF%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0,+50000/@47.9127938,33.4557635,17.54z/data=!4m15!1m8!3m7!1s0x40dadfe03154ab7b:0xb0fa3a177d6b186e!2z0JrRgNC40LLQvtC5INCg0L7Qsywg0JTQvdC10L_RgNC-0L_QtdGC0YDQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0LjQvdCwLCA1MDAwMA!3b1!8m2!3d47.910483!4d33.391783!16zL20vMDJ4ejRy!3m5!1s0x40db210060c4e50f:0x8741ac3729bc0936!8m2!3d47.9131961!4d33.4566665!16s%2Fg%2F11c4rp2zj2?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D',
	getCheckout: (id: string) => (id ? `/checkout?shoppingId=${id}` : '/checkout'),
	getPriceRange: (min: number, max: number) => `${routes.all}?price=${min}&price=${max}`,

	api: {
		adminLogin: '/api/admin/login',
		adminLogout: '/api/admin/logout',
		adminProduct: '/api/admin/product',
		adminImags: '/api/admin/images',
	},

	admin: {
		main: '/admin',
		login: '/admin/login',
		add: '/admin/add',
		products: '/admin/products',
		toEditProduct: (id: string) => `/admin/${id}`,
	},
}

export default routes
