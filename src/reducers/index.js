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
        case ACTION_TYPES.GET_POST:
            return [action.post]
        case ACTION_TYPES.DELETE_POST:
            return state.filter(p => p.id !== action.postId)
        case ACTION_TYPES.ADD_POST:
            return state.concat(action.post)
        case ACTION_TYPES.UPDATE_POST:
            return state.map(post => post.id === action.post.id ? 
                {...post, ...action.post} : post)
        default:
            return state
    }
}

function comments(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_COMMENTS:
            return action.comments
        case ACTION_TYPES.DELETE_COMMENT:
            return state.filter(p => p.id !== action.commentId)
        case ACTION_TYPES.ADD_COMMENT:
            return state.concat(action.comment)
        case ACTION_TYPES.UPDATE_COMMENT:
            return state.map(comment => comment.id === action.comment.id ? 
                {...comment, ...action.comment} : comment)
        default:
            return state
    }
}

// export default categoriesReducer
export default combineReducers ({
	categories,
	posts,
    comments
})