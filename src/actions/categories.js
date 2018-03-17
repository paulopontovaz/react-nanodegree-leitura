import { getAll } from '../utils/CategoriesAPI'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export function fetchCategories (categories) {//action creator
  return {
    type: FETCH_CATEGORIES,
    categories
  }
}

export function getAllCategories () {
  return dispatch => getAll()
      .then(categories => dispatch(fetchCategories(categories)))
 }