import { combineReducers } from 'redux'
import sortBy from 'sort-by'
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
            let posts = action.posts

            posts.sort(sortBy('-voteScore'))

            return posts

        case ACTION_TYPES.GET_POST:
            return [action.post]

        case ACTION_TYPES.DELETE_POST:
            return state.filter(p => p.id !== action.postId)

        case ACTION_TYPES.ADD_POST:
            return state.concat(action.post)

        case ACTION_TYPES.UPDATE_POST:
            return state.map(post => post.id === action.post.id ? 
                {...post, ...action.post} : post)

        case ACTION_TYPES.ORDER_POSTS:
            let orderedPosts = Object.assign([], state)

            if(!action.newOrder)
                orderedPosts.sort(sortBy('-voteScore'))
            else {
                const order = action.ascending === true ? action.newOrder : '-' + action.newOrder
                orderedPosts.sort(sortBy(order))
            }

            return orderedPosts

        default:
            return state
    }
}

function comments(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_COMMENTS:
            let comments = action.comments

            comments.sort(sortBy('-voteScore'))

            return comments

        case ACTION_TYPES.DELETE_COMMENT:
            return state.filter(p => p.id !== action.commentId)

        case ACTION_TYPES.ADD_COMMENT:
            return state.concat(action.comment)

        case ACTION_TYPES.UPDATE_COMMENT:
            return state.map(comment => comment.id === action.comment.id ? 
                {...comment, ...action.comment} : comment)

        case ACTION_TYPES.ORDER_COMMENTS:
            let orderedComments = Object.assign([], state)

            if(!action.newOrder)
                orderedComments.sort(sortBy('-voteScore'))
            else {
                const order = action.ascending === true ? action.newOrder : '-' + action.newOrder
                orderedComments.sort(sortBy(order))
            }

            return orderedComments

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