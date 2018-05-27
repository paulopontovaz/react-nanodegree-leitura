import * as CategoriesAPI from '../utils/API/Categories'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'

//Action creator responsável pela obtenção de todas as categorias.
function fetchCategories (categories) {
	return {
		type: ACTION_TYPES.GET_ALL_CATEGORIES,
		categories
	}
}

//Função chamada no componente para despachar o action creator de obtenção de categorias.
export function getAllCategories () {
	return dispatch => CategoriesAPI.getAllCategories()
		.then(categories => dispatch(fetchCategories(categories)))
}