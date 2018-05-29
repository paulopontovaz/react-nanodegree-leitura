import { combineReducers } from 'redux'
import * as ACTION_TYPES from '../utils/constants/ActionTypes'
import * as ORDER_TYPES from '../utils/constants/OrderTypes'

//Reducer de categorias. Criado apenas para obter a lista total de categorias.
function categories(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_ALL_CATEGORIES:
            return action.categories
        default:
            return state
    }
}

//Reducer de posts. 
function posts(state = [], action) {
    switch (action.type) {
        case ACTION_TYPES.GET_POSTS:
            return action.posts

        case ACTION_TYPES.GET_POST:
            /* Para manter o formato de retorno, ao solicitar um post pela ID,
            o retorno é uma lista com apenas um elemento. */
            return [action.post]

        case ACTION_TYPES.DELETE_POST:
            //Filtrando o post excluído para fora da lista.
            return state.filter(p => p.id !== action.postId)

        case ACTION_TYPES.ADD_POST:
            return state.concat(action.post)

        case ACTION_TYPES.UPDATE_POST:
            //Modificando apenas o post cuja ID foi passada na action.
            return state.map(post => post.id === action.post.id ? 
                {...post, ...action.post} : post)

        default:
            return state
    }
}

//Reducer cujo estado armazena o tipo de ordenação dos posts.
function postListOrder(state = {orderType: ORDER_TYPES.VOTE_SCORE, ascending: false}, action) {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_ORDER_POSTS:
            return {orderType: action.orderType, ascending: action.ascending}
        default:
            return state
    }    
}

//Reducer de comentários, feito baseado no de posts.
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

//Reducer cujo estado armazena o tipo de ordenação dos comments.
function commentListOrder(state = {orderType: ORDER_TYPES.VOTE_SCORE, ascending: false}, action) {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_ORDER_COMMENTS:
            return {orderType: action.orderType, ascending: action.ascending}
        default:
            return state
    } 
}

//Combinando os três reducers num só objeto, com "combineReducers".
export default combineReducers ({
	categories,
	posts,
    postListOrder,
    comments,
    commentListOrder,
})