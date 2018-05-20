import { combineReducers } from 'redux'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'

function categories(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_CATEGORIES:
            return action.categories
        default:
            return state
    }
}

function posts(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_POSTS:
            return action.posts
        case ACTION_TYPES.GET_COMMENTS:
        	let parentPost = Object.assign({}, state.find(p => action.comments[0].parentId === p.id))
    		parentPost.comments = action.comments

        	return state.filter(p => action.comments[0].parentId !== p.id).concat(parentPost)
        case ACTION_TYPES.DELETE_POST:
            return state.filter(p => p.id !== action.postId)
        case ACTION_TYPES.ADD_POST:
            return state.concat(action.post)
        default:
            return state
    }
}

function comments(state = [], action) {
    return state
}

// export default categoriesReducer
export default combineReducers ({
	categories,
	posts
})