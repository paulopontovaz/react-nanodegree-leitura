import { combineReducers } from 'redux'
import { 
  FETCH_CATEGORIES,
  CATEGORIES_ARE_LOADING,
  CATEGORIES_HAVE_ERROR
} from '../actions/categories'

export function categoriesHaveError(state = false, action) {
    switch (action.type) {
        case CATEGORIES_HAVE_ERROR:
            return action.hasError;
        default:
            return state;
    }
}

export function categoriesAreLoading(state = false, action) {
    switch (action.type) {
        case CATEGORIES_ARE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function categories(state = [], action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}

// function comments (state = {}, action) {
//   switch (action.type) {
//     default:
//       return state
//   }
// }

// function posts (state = {}, action) {
//   switch(action.type) {
//     default:
//       return state
//   }
// }

export default combineReducers({
  categories,
  categoriesAreLoading,
  categoriesHaveError
})