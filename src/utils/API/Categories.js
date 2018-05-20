import * as ApiData from './ApiData'

export const getAllCategories = () =>
	fetch(`${ApiData.url}/categories`, { headers: ApiData.headers })
	    .then(res => res.json())
	    .then(data => data.categories)