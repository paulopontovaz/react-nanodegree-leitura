// import { combineReducers } from 'redux'
import { FETCH_CATEGORIES } from '../actions/categories'

function reducer (state, action) {
  const { categories } = action

  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories
      }
    default:
      return state
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

export default reducer

// combineReducers({
//   comments,
//   posts,
// })