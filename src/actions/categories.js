import * as CategoriesAPI from '../utils/CategoriesAPI'
import * as ACTION_TYPES from './actionTypes'

export function categoriesAreLoading (bool) {
  return {
    type: ACTION_TYPES.CATEGORIES_ARE_LOADING,
    isLoading: bool
  }
}

export function categoriesHaveError (bool) {
  return {
    type: ACTION_TYPES.CATEGORIES_HAVE_ERROR,
    hasError: bool
  }
}

export function fetchCategories (categories) {
  return {
    type: ACTION_TYPES.GET_ALL_CATEGORIES,
    categories
  }
}

export function getAllCategories () {
  return dispatch => CategoriesAPI.getAll()
    .then(categories => dispatch(fetchCategories(categories)))
}