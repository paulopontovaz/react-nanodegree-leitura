import { getAll } from '../utils/CategoriesAPI'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const CATEGORIES_ARE_LOADING = 'CATEGORIES_ARE_LOADING'
export const CATEGORIES_HAVE_ERROR = 'CATEGORIES_HAVE_ERROR'

export function categoriesAreLoading (bool) {//action creator
  return {
    type: CATEGORIES_ARE_LOADING,
    isLoading: bool
  }
}

export function categoriesHaveError (bool) {//action creator
  return {
    type: CATEGORIES_HAVE_ERROR,
    hasError: bool
  }
}

export function fetchCategories (categories) {//action creator
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}

export function getAllCategories () {
  return dispatch => {
  	dispatch(categoriesAreLoading(true))

  	getAll()
      .then(response => {
      	dispatch(categoriesAreLoading(false))
      	return response
      })
      .then(categories => dispatch(fetchCategories(categories)))
      .catch(() => dispatch(categoriesHaveError(true)))
  }
 }