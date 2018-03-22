import { combineReducers } from 'redux'
import * as ACTION_TYPES from '../actions/actionTypes'

function categoriesHaveError(state = false, action) {
    switch (action.type) {
        case ACTION_TYPES.CATEGORIES_HAVE_ERROR:
            return action.hasError;
        default:
            return state;
    }
}

function categoriesAreLoading(state = false, action) {
    switch (action.type) {
        case ACTION_TYPES.CATEGORIES_ARE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
}

export default combineReducers ({
  categories,
  categoriesAreLoading,
  categoriesHaveError
})