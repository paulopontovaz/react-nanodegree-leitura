import * as CategoriesAPI from '../utils/API/Categories'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'

function fetchCategories (categories) {
	return {
		type: ACTION_TYPES.GET_ALL_CATEGORIES,
		categories
	}
}

export function getAllCategories () {
	return dispatch => CategoriesAPI.getAllCategories()
		.then(categories => dispatch(fetchCategories(categories)))
}