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
        case ACTION_TYPES.DELETE_POST:
            return state.filter(p => p.id !== action.postId)
        case ACTION_TYPES.ADD_POST:
            return state.concat(action.post)
        case ACTION_TYPES.UPDATE_POST:
            return state.map(post => post.id === action.post.id ? 
                {...post, ...action.post} : post)
        case ACTION_TYPES.GET_COMMENTS:
            if(action.comments && action.comments.length > 0){
                let parentPost = state.find(p => action.comments && action.comments[0].parentId === p.id)
                parentPost.comments = action.comments
            }
            return state
        case ACTION_TYPES.DELETE_COMMENT:
            return state.map(post => {
                if (action.comment.parentId === post.id) 
                    post.comments = post.comments.filter(comment => action.comments.id !== comment.id)                  
                return post
            })
        case ACTION_TYPES.ADD_COMMENT:            
            return state.map(post => {
                if (action.comment.parentId === post.id) 
                    post.comments = post.comments ? post.comments.concat(action.comment) :
                        [action.comment]                    
                return post
            })
        case ACTION_TYPES.UPDATE_COMMENT:
            return state.map(post => {
                if (action.comment.parentId === post.id) 
                    post.comments = post.comments.map(comment => {
                                        return comment.id === action.comment.id ? 
                                        {...comment, ...action.comment} : comment
                                    })
                return post
            })
        default:
            return state
    }
}

function comments(state = [], action) {
    switch (action.type) {        
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