import { DEFAULT_SORT_FOR_PRODUCTS, SHOPPING_ID } from '@/constants'
import { arrayWrapper, getFilteredProducts } from '@/helpers'
import { FilterQuery, IProduct, InitialFilter } from '@/interfaces'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useFilter() {
	const router = useRouter()
	const [query, setQuery] = useState(filterChecker(router.query))

	const define = (option: keyof InitialFilter, values: string[]) => {
		const newQuery = { ...query, [option]: values }

		if (values.length === 0) delete newQuery[option]

		setQuery(newQuery)

		return newQuery
	}

	const updateURL = (newQuery: typeof query & { id?: string }) => {
		router.replace(
			{
				query: filterChecker(newQuery as InitialFilter) || query,
			},
			undefined,
			{ shallow: true }
		)
	}

	const reset = () => {
		const keys = Object.keys(query)
		const copyQuery = { ...query }

		keys.forEach((key) => {
			Object.defineProperty(copyQuery, key, { value: [] })
		})

		Object.defineProperties(copyQuery, {
			globalCategory: { value: arrayWrapper(router.query.globalCategory) },
			sort: { value: [DEFAULT_SORT_FOR_PRODUCTS] },
		})

		updateURL(copyQuery)
	}

	const getQueryProducts = (products: IProduct[]) => getFilteredProducts(products, query)

	useEffect(() => {
		setQuery(filterChecker(router.query))
	}, [router.query])

	return { query, define, reset, updateURL, getQueryProducts }
}

function filterChecker(filter: InitialFilter): FilterQuery {
	if (Array.isArray(filter.sort) && filter.sort.length > 1) {
		console.warn(`Sort have to be single.`)
	}

	const reducedFilter: FilterQuery = Object.entries(filter).reduce<FilterQuery>((acc, [key, value]) => {
		if (key === 'sort') {
			acc[key] = arrayWrapper(filter.sort).length === 0 ? [DEFAULT_SORT_FOR_PRODUCTS] : arrayWrapper(filter.sort || [])
		} else {
			acc[key as keyof FilterQuery] = arrayWrapper(value)
		}

		return acc
	}, {})

	if (!reducedFilter.sort) {
		reducedFilter.sort = [DEFAULT_SORT_FOR_PRODUCTS]
	}

	return reducedFilter
}
